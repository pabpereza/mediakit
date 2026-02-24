#!/usr/bin/env python3
"""Update YouTube channel metrics (subscriber count, video count, and total views) in metrics.json.

Fetches data directly from the YouTube channel page without requiring an API key.
Run this script from the repository root:
    python scripts/update_youtube_metrics.py
"""

import json
import re
import sys
import urllib.request
from datetime import date

CHANNEL_URL = "https://www.youtube.com/@pabpereza"
METRICS_FILE = "src/data/metrics.json"


def fetch_page(url: str) -> str:
    req = urllib.request.Request(
        url,
        headers={
            "User-Agent": (
                "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 "
                "(KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
            ),
            "Accept-Language": "en-US,en;q=0.9",
        },
    )
    with urllib.request.urlopen(req, timeout=30) as response:
        return response.read().decode("utf-8")


def extract_yt_initial_data(html: str) -> dict:
    """Extract the ytInitialData JSON object embedded in the YouTube page."""
    match = re.search(r"var ytInitialData\s*=\s*(\{)", html)
    if not match:
        raise ValueError("ytInitialData not found in page HTML")
    start = match.start(1)
    decoder = json.JSONDecoder()
    data, _ = decoder.raw_decode(html[start:])
    return data


def get_subscriber_count(data: dict, html: str) -> str | None:
    """Extract and format subscriber count from ytInitialData or raw HTML."""
    header = data.get("header", {})

    # c4TabbedHeaderRenderer layout (most common)
    c4 = header.get("c4TabbedHeaderRenderer", {})
    if c4:
        sub_obj = c4.get("subscriberCountText", {})
        text = sub_obj.get("simpleText", "")
        if text:
            return re.sub(r"\s*subscribers?\s*$", "", text, flags=re.IGNORECASE).strip()

    # pageHeaderRenderer layout (newer YouTube UI)
    page_header = header.get("pageHeaderRenderer", {})
    metadata_rows = (
        page_header.get("content", {})
        .get("pageHeaderViewModel", {})
        .get("metadata", {})
        .get("contentMetadataViewModel", {})
        .get("metadataRows", [])
    )
    for row in metadata_rows:
        for part in row.get("metadataParts", []):
            text = part.get("text", {}).get("content", "")
            if "subscriber" in text.lower():
                return re.sub(
                    r"\s*subscribers?\s*$", "", text, flags=re.IGNORECASE
                ).strip()

    # Fallback: direct regex on raw HTML
    m = re.search(
        r'"subscriberCountText"\s*:\s*\{\s*"simpleText"\s*:\s*"([^"]+)"', html
    )
    if m:
        text = m.group(1)
        return re.sub(r"\s*subscribers?\s*$", "", text, flags=re.IGNORECASE).strip()

    return None


def get_video_count(data: dict, html: str) -> str | None:
    """Extract and format video count from ytInitialData or raw HTML."""
    header = data.get("header", {})

    # c4TabbedHeaderRenderer layout
    c4 = header.get("c4TabbedHeaderRenderer", {})
    if c4:
        vid_obj = c4.get("videosCountText", {})
        if isinstance(vid_obj, dict):
            runs = vid_obj.get("runs", [])
            text = "".join(r.get("text", "") for r in runs)
            m = re.match(r"(\d[\d,.]*)", text.strip())
            if m:
                return m.group(1).replace(",", "").replace(".", "")

    # pageHeaderRenderer layout
    page_header = header.get("pageHeaderRenderer", {})
    metadata_rows = (
        page_header.get("content", {})
        .get("pageHeaderViewModel", {})
        .get("metadata", {})
        .get("contentMetadataViewModel", {})
        .get("metadataRows", [])
    )
    for row in metadata_rows:
        for part in row.get("metadataParts", []):
            text = part.get("text", {}).get("content", "")
            if "video" in text.lower():
                m = re.match(r"(\d[\d,.]*)", text.strip())
                if m:
                    return m.group(1).replace(",", "").replace(".", "")

    # Fallback: direct regex on raw HTML
    m = re.search(r'"videosCountText"\s*:\s*\{"runs":\[\{"text"\s*:\s*"(\d+)"', html)
    if m:
        return m.group(1)

    return None


def get_view_count(data: dict, html: str) -> str | None:
    """Extract total view count from ytInitialData or raw HTML."""
    # microformat is the most reliable source for raw view count
    view_count = (
        data.get("microformat", {})
        .get("microformatDataRenderer", {})
        .get("viewCount")
    )
    if view_count:
        return str(view_count)

    # pageHeaderRenderer layout (newer YouTube UI)
    header = data.get("header", {})
    page_header = header.get("pageHeaderRenderer", {})
    metadata_rows = (
        page_header.get("content", {})
        .get("pageHeaderViewModel", {})
        .get("metadata", {})
        .get("contentMetadataViewModel", {})
        .get("metadataRows", [])
    )
    for row in metadata_rows:
        for part in row.get("metadataParts", []):
            text = part.get("text", {}).get("content", "")
            if "view" in text.lower():
                m = re.match(r"([\d,.\s]+)", text.strip())
                if m:
                    return m.group(1).strip().replace(",", "").replace(".", "").replace(" ", "")

    # Fallback: direct regex on raw HTML
    m = re.search(r'"viewCount"\s*:\s*"(\d+)"', html)
    if m:
        return m.group(1)

    return None


def update_metrics_file(
    subscribers: str | None, video_count: str | None, view_count: str | None
) -> None:
    """Write updated subscriber count, video count, and total views to metrics.json."""
    with open(METRICS_FILE, "r", encoding="utf-8") as f:
        metrics = json.load(f)

    changed = False
    # global.totalProfessionals stores the YouTube subscriber count (IT professionals audience)
    if subscribers and metrics["global"]["totalProfessionals"] != subscribers:
        metrics["global"]["totalProfessionals"] = subscribers
        changed = True
    if video_count and metrics["channel"]["videoCount"] != video_count:
        metrics["channel"]["videoCount"] = video_count
        changed = True
    if view_count and metrics["channel"]["viewCount"] != view_count:
        metrics["channel"]["viewCount"] = view_count
        changed = True

    if changed:
        metrics["_meta"]["lastUpdated"] = date.today().isoformat()
        with open(METRICS_FILE, "w", encoding="utf-8") as f:
            json.dump(metrics, f, indent=2, ensure_ascii=False)
            f.write("\n")
        print(
            f"metrics.json updated: subscribers={subscribers!r}, "
            f"videos={video_count!r}, views={view_count!r}"
        )
    else:
        print("No changes to metrics.json (values unchanged)")


def main() -> None:
    print(f"Fetching: {CHANNEL_URL}")
    try:
        html = fetch_page(CHANNEL_URL)
    except Exception as exc:
        print(f"ERROR fetching page: {exc}", file=sys.stderr)
        sys.exit(1)

    try:
        data = extract_yt_initial_data(html)
    except Exception as exc:
        print(f"ERROR extracting ytInitialData: {exc}", file=sys.stderr)
        sys.exit(1)

    subscribers = get_subscriber_count(data, html)
    video_count = get_video_count(data, html)
    view_count = get_view_count(data, html)

    print(f"Extracted: subscribers={subscribers!r}, videos={video_count!r}, views={view_count!r}")

    if not subscribers and not video_count and not view_count:
        print("ERROR: Could not extract any metrics from page", file=sys.stderr)
        sys.exit(1)

    update_metrics_file(subscribers, video_count, view_count)


if __name__ == "__main__":
    main()
