# Pages — Link Logic Notes

## Data model

Two parallel representations of the user's social links exist:

| Name | Type | Where | What it contains |
|---|---|---|---|
| `devTreeLinks` | `DevTreeLink[]` | Local React state | All 8 networks, always. No `id`. Used to render the input list. |
| `user.links` | `SocialNetwork[]` (JSON string) | TanStack Query cache + DB | Only networks with a non-empty URL. Has `id`. Sent to the backend on Save. |

```ts
type DevTreeLink = { name: string; url: string; enabled: boolean };
type SocialNetwork = { id: string; name: string; url: string; enabled: boolean };
```

`id` is always equal to `name` (e.g. `"facebook"`), making it stable for drag-and-drop regardless of array position.

## Array order = display order

The position of each link in the stored `user.links` array is the canonical display order. Enabled links come first, disabled links after. This order is what the sidebar preview and drag-and-drop operate on.

## buildStoredLinks

Located in `utils/linkHelpers.ts`. Every time links change (URL typed, toggle flipped, or drag-and-drop reorder), the stored array is rebuilt through this helper:

```ts
function buildStoredLinks(
  editorState: DevTreeLink[],
  currentStored: SocialNetwork[],
): SocialNetwork[]
```

- Filters out empty URLs
- Classifies links as **newly enabled**, **existing enabled**, or **disabled**
- Newly enabled links go to **first position** among enabled links
- Existing enabled links preserve their current stored order (respects drag-and-drop)
- Disabled links go after all enabled links
- Each item gets `id: link.name`

Both `LinkTreePage` handlers and `DevTree`'s drag handler use this function (or direct array manipulation for drag) to keep the cache in sync.

## Toggle rules

- **Enable**: only allowed if the URL passes `isValidUrl()`. Shows a toast error otherwise. Newly enabled links appear first in the sidebar.
- **Disable**: always allowed, regardless of URL validity.

## Save flow

The "Save Changes" button reads the current `user` from the TanStack Query cache at click time via `queryClient.getQueryData`. Because `handleUrlChange`, `handleToggleChange`, and drag-and-drop all keep the cache in sync via `queryClient.setQueryData`, the saved data always reflects the latest state including order changes.
