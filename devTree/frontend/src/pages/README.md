# Pages — Link Logic Notes

## Data model

Two parallel representations of the user's social links exist:

| Name | Type | Where | What it contains |
|---|---|---|---|
| `devTreeLinks` | `DevTreeLink[]` | Local React state | All 8 networks, always. No `id`. Used to render the input list. |
| `user.links` | `SocialNetwork[]` (JSON string) | TanStack Query cache + DB | Only networks with a non-empty URL. Has `id`. Sent to the backend on Save. |

```ts
type DevTreeLink = { name: string; url: string; enabled: boolean };
type SocialNetwork = { id: number; name: string; url: string; enabled: boolean };
```

## Why store links with a URL even if disabled?

When drag-and-drop is added, the user will reorder their links. We need to persist the order for all configured links — not just the enabled ones — so the position is remembered even when a link is temporarily hidden.

## buildLinksPayload

Every time `devTreeLinks` changes (URL typed or toggle flipped), both the local state and the cache are updated using this helper:

```ts
function buildLinksPayload(links: DevTreeLink[]): SocialNetwork[] {
  return links
    .filter((link) => link.url.trim() !== "")
    .map((link, index) => ({ ...link, id: index + 1 }));
}
```

- Filters out empty URLs
- Assigns sequential 1-based `id`s based on the current order in `devTreeLinks`
- Result is JSON-stringified into `user.links`

## Toggle rules

- **Enable**: only allowed if the URL passes `isValidUrl()`. Shows a toast error otherwise.
- **Disable**: always allowed, regardless of URL validity.

## Save flow

`mutate(user)` reads `user` from the TanStack Query cache at click time. Because both `handleUrlChange` and `handleToggleChange` keep the cache in sync via `queryClient.setQueryData`, the saved data always reflects the current state of the inputs.
