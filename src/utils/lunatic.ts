export function hasResponse(
  component: unknown
): component is { response: { name: string } } {
  return (
    !!component &&
    typeof component === 'object' &&
    'response' in component &&
    'name' in (component.response as object)
  );
}
