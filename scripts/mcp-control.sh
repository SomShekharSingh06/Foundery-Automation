#!/usr/bin/env bash
BASE_URL="http://localhost:8090"

case "$1" in
  start)
    curl -s -X POST "$BASE_URL/mcp/start" | jq . ;;
  stop)
    curl -s -X POST "$BASE_URL/mcp/stop" | jq . ;;
  status)
    curl -s "$BASE_URL/mcp/status" | jq . ;;
  *)
    echo "Usage: $0 {start|stop|status}" ;;
esac
