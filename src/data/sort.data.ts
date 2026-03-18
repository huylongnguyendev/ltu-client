import type { SortItems, TypeDropItems } from "#/@types/sort.type";

export const typeDropItems: TypeDropItems = [
  {
    label: "Listening",
    name: "Listening",
    type: "LISTENING",
  },
  {
    label: "Speaking",
    name: "Speaking",
    type: "SPEAKING",
  },
  {
    label: "Reading",
    name: "Reading",
    type: "READING",
  },
  {
    label: "Writing",
    name: "Writing",
    type: "WRITING",
  },
];

export const sortItems: SortItems = [
  {
    label: "Newest",
    name: "sort",
    value: "createdAt_desc"
  },
  {
    label: "Latest",
    name: "sort",
    value: "createdAt_asc"
  },
  {
    label: "Sort by A-Z",
    name: "sort",
    value: "name_asc",
  },
  {
    label: "Sort by Z-A",
    name: "sort",
    value: "name_desc",
  },
]
