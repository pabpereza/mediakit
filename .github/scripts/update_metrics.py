#!/usr/bin/env python3
"""
Update YouTube metrics (subscribers and video count) in metrics.json
without requiring a YouTube Data API key.

Uses yt-dlp to scrape channel statistics directly from YouTube.
"""

import json
import sys
from datetime import date
from pathlib import Path

import yt_dlp

CHANNEL_URL = "https://www.youtube.com/@pabpereza"
METRICS_FILE = Path(__file__).parent.parent.parent / "src" / "data" / "metrics.json"


def format_subscriber_count(n: int) -> str:
    """Format raw subscriber count to a human-readable string (e.g. 21300 -> '21K')."""
    if n >= 1_000_000:
        value = n / 1_000_000
        formatted = f"{value:.1f}"
        if formatted.endswith(".0"):
            formatted = formatted[:-2]
        return f"{formatted}M"
    if n >= 1_000:
        value = n / 1_000
        # Use one decimal only when meaningful (e.g. 21.3K, not 21.0K)
        formatted = f"{value:.1f}"
        if formatted.endswith(".0"):
            formatted = formatted[:-2]
        return f"{formatted}K"
    return str(n)


def fetch_channel_stats() -> tuple[int, int]:
    """Return (subscriber_count, video_count) by scraping the YouTube channel."""
    opts = {
        "quiet": True,
        "no_warnings": True,
        "skip_download": True,
        "extract_flat": True,
    }
    with yt_dlp.YoutubeDL(opts) as ydl:
        info = ydl.extract_info(CHANNEL_URL, download=False)

    if info is None:
        raise RuntimeError("yt-dlp returned no data for the channel")

    subscriber_count = info.get("channel_follower_count")
    video_count = info.get("playlist_count")

    if subscriber_count is None:
        raise RuntimeError("Could not find 'channel_follower_count' in yt-dlp output")
    if video_count is None:
        raise RuntimeError("Could not find 'playlist_count' in yt-dlp output")

    return int(subscriber_count), int(video_count)


def update_metrics(subscriber_count: int, video_count: int) -> bool:
    """
    Update metrics.json with new values.
    Returns True if the file was changed, False if values are identical.
    """
    with open(METRICS_FILE, "r", encoding="utf-8") as f:
        data = json.load(f)

    new_subscribers = format_subscriber_count(subscriber_count)
    new_video_count = f"{video_count}+"
    today = date.today().isoformat()

    old_subscribers = data["global"]["totalProfessionals"]
    old_video_count = data["channel"]["videoCount"]

    if old_subscribers == new_subscribers and old_video_count == new_video_count:
        print(f"No changes: subscribers={new_subscribers}, videos={new_video_count}")
        return False

    data["global"]["totalProfessionals"] = new_subscribers
    data["channel"]["videoCount"] = new_video_count
    data["_meta"]["lastUpdated"] = today

    with open(METRICS_FILE, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
        f.write("\n")

    print(
        f"Updated metrics: subscribers {old_subscribers} -> {new_subscribers}, "
        f"videos {old_video_count} -> {new_video_count}"
    )
    return True


def main() -> None:
    print(f"Fetching YouTube stats for {CHANNEL_URL} ...")
    try:
        subscriber_count, video_count = fetch_channel_stats()
    except Exception as exc:
        print(f"ERROR: {exc}", file=sys.stderr)
        sys.exit(1)

    print(f"Raw stats: subscribers={subscriber_count}, videos={video_count}")
    update_metrics(subscriber_count, video_count)


if __name__ == "__main__":
    main()
