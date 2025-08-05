// type NestedObject = {
//   [key: string]: string | number | boolean | null | NestedObject;
// };

// export function getNestedTranslation(
//   obj: NestedObject,
//   path: string,
//   fallback: string = ""
// ): string {
//   return (
//     String(
//       path
//         .split(".")
//         .reduce<any>(
//           (acc, key) => (acc && typeof acc === "object" ? acc[key] : fallback),
//           obj
//         )
//     ) || fallback
//   );
// }

type NestedObject = {
  [key: string]: string | number | boolean | null | NestedObject;
};

export function getNestedTranslation(
  obj: NestedObject,
  path: string,
  fallback: string = ""
): string {
  return (
    String(
      path
        .split(".")
        .reduce<unknown>(
          (acc, key) =>
            acc && typeof acc === "object" && acc !== null
              ? (acc as NestedObject)[key]
              : fallback,
          obj
        )
    ) || fallback
  );
}
