#!/usr/bin/env python3
"""Update YouTube channel metrics (subscriber count, video count, and total views) in metrics.json.

Fetches data via the YouTube Data API v3 using an API key.
Set YT_API_KEY in the environment before running:
    python scripts/update_youtube_metrics.py
"""

import json
import re
import sys
import os
import urllib.parse
import urllib.request
from datetime import date
from typing import Optional

CHANNEL_HANDLE = "pabpereza"
METRICS_FILE = "src/data/metrics.json"
YOUTUBE_API_URL = "https://www.googleapis.com/youtube/v3/channels"


def fetch_channel_statistics(api_key: str, handle: str) -> dict:
    params = urllib.parse.urlencode(
        {"part": "statistics", "forHandle": handle, "key": api_key}
    )
    url = f"{YOUTUBE_API_URL}?{params}"
    req = urllib.request.Request(url)
    with urllib.request.urlopen(req, timeout=30) as response:
        payload = json.load(response)
    items = payload.get("items", [])
    if not items:
        raise ValueError("YouTube API returned no channel items")
    return items[0].get("statistics", {})


def format_compact_count(value: Optional[str]) -> Optional[str]:
    """Format a numeric count into a compact string (e.g., 793000 -> 793K)."""
    if not value:
        return None
    if re.search(r"[A-Za-z]", value):
        return value
    digits = re.sub(r"\D", "", value)
    if not digits:
        return value
    number = int(digits)
    if number >= 1_000_000_000:
        compact = number / 1_000_000_000
        suffix = "B"
    elif number >= 1_000_000:
        compact = number / 1_000_000
        suffix = "M"
    elif number >= 1_000:
        compact = number / 1_000
        suffix = "K"
    else:
        return str(number)
    formatted = f"{compact:.1f}".rstrip("0").rstrip(".")
    return f"{formatted}{suffix}"


def update_metrics_file(
    subscribers: Optional[str],
    video_count: Optional[str],
    view_count: Optional[str],
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
    api_key = os.environ.get("YT_API_KEY")
    if not api_key:
        print("ERROR: YT_API_KEY not set in environment", file=sys.stderr)
        sys.exit(1)

    print(f"Fetching channel stats for handle: {CHANNEL_HANDLE}")
    try:
        stats = fetch_channel_statistics(api_key, CHANNEL_HANDLE)
    except Exception as exc:
        print(f"ERROR fetching YouTube API stats: {exc}", file=sys.stderr)
        sys.exit(1)

    subscribers = format_compact_count(stats.get("subscriberCount"))
    video_count = stats.get("videoCount")
    view_count = format_compact_count(stats.get("viewCount"))

    print(
        "Extracted: "
        f"subscribers={subscribers!r}, videos={video_count!r}, views={view_count!r}"
    )

    if not subscribers and not video_count and not view_count:
        print("ERROR: Could not extract any metrics from API", file=sys.stderr)
        sys.exit(1)

    update_metrics_file(subscribers, video_count, view_count)


if __name__ == "__main__":
    main()
