import TableOperations from "../../ui/TableOperations";
import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";

function CabinTableOperaions() {
  return (
    <TableOperations>
      <Filter
        filterField="discount"
        options={[
          { label: "All", value: "all" },
          { label: "No discount", value: "no-discount" },
          { label: "With discount", value: "with-discount" },
        ]}
      />
      <SortBy
        options={[
          { value: "name=asc", label: "Sort by name (A-Z)" },
          { value: "name=desc", label: "Sort by name (Z-A)" },
        ]}
      />
    </TableOperations>
  );
}

export default CabinTableOperaions;
