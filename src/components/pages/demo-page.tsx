import { useState } from "react"
import { DataTable, TableColumn } from "../datatable/data-table"
import { Card, CardContent } from "../ui/card"
import { SelectComponent } from "../select/select"
import { Option } from "../select"
import { Button } from "../ui/button"
import { MultiSelect } from "../select/multi-select"
import { SearchableSelect } from "../select/searchable-select"
import { SearchableMultiSelect } from "../select/searchable-multi-select"
import { StatusView } from "../status-view-component"
import { toast } from "sonner"

type Person = {
  name    : string
  age     : number
  address : string
}

export const DemoPage = () => {
  const [tableLoading, setTableLoading] = useState(false)
  const [refreshTable, setRefreshTable] = useState(false)
  const [selectValue, setSelectValue] = useState<Option>(null)
  const [multiSelectValue, setMultiSelectValue] = useState<Option[]>([])
  const [srchSelectValue, setSrchSelectValue] = useState<Option>(null)
  const [srchMultiSelectValue, setSrchMultiSelectValue] = useState<Option[]>([])

  const data: Person[] = [
    {
      name: "Benj",
      age: 28,
      address: "Batangas",
    },
    {
      name: "Jimmy",
      age: 25,
      address: "Batangas",
    },
  ]

  const columns: TableColumn<Person>[] = [
    {
      accessorKey: 'name',
      header: 'Name',
      cell: ({ row }) => row.getValue('name'),
    },
    {
      accessorKey: 'age',
      header: 'Age',
      cell: ({ row }) => row.getValue('age'),
    },
    {
      accessorKey: 'address',
      header: 'Address',
      cell: ({ row }) => row.getValue('address'),
    },
  ]

  const options: Option[] = [
    { label: "Apple", value: "Apple" },
    { label: "Banana", value: "Banana" },
    { label: "Orange", value: "Orange" },
    { label: "Grapes", value: "Grapes" },
  ]

  return (
    <div className="w-full">
      <div className="grid gap-4 m-4">
        <Card className="dark:bg-gray-900">
          <CardContent className="grid grid-flow-row py-0 gap-4">
            <div>
              <span className="text-xl font-bold">DATA TABLE</span>
              <DataTable
                data={data}
                columns={columns}
                isIndexed
                refreshTrigger={() => setRefreshTable(!refreshTable)}
              />
            </div>
            <div className="grid gap-2">
              <span className="text-xl font-bold">SELECT</span>
              <div className="flex gap-2">
                <SelectComponent
                  value={selectValue}
                  className="w-1/3"
                  options={options}
                  onChange={(option) => setSelectValue(option)}
                  haveEffect
                />
                <Button
                  className="cursor-pointer border !border-gray-500 hover:!bg-gray-500"
                  variant="outline"
                  onClick={() => setSelectValue(null)}
                >
                  Reset
                </Button>
              </div>
            </div>
            <div className="grid gap-2">
              <span className="text-xl font-bold">MULTI SELECT</span>
              <div className="flex gap-2">
                <MultiSelect
                  className="w-1/3"
                  value={multiSelectValue}
                  options={options}
                  onChange={(option) => setMultiSelectValue(option)}
                  haveEffect
                  persistOpen
                />
                <Button
                  className="cursor-pointer border !border-gray-500 hover:!bg-gray-500"
                  variant="outline"
                  onClick={() => setMultiSelectValue([])}
                >
                  Reset
                </Button>
              </div>
            </div>
            <div className="grid gap-2">
              <span className="text-xl font-bold">SEARCHABLE SELECT</span>
              <div className="flex gap-2">
                <SearchableSelect
                  className="w-1/3"
                  value={srchSelectValue}
                  options={options}
                  onChange={(option) => setSrchSelectValue(option)}
                  haveEffect
                />
                <Button
                  className="cursor-pointer border !border-gray-500 hover:!bg-gray-500"
                  variant="outline"
                  onClick={() => setSrchSelectValue(null)}
                >
                  Reset
                </Button>
              </div>
            </div>
            <div className="grid gap-2">
              <span className="text-xl font-bold">SEARCHABLE MULTI SELECT</span>
              <div className="flex gap-2">
                <SearchableMultiSelect
                  className="w-1/3"
                  value={srchMultiSelectValue}
                  options={options}
                  onChange={(option) => setSrchMultiSelectValue(option)}
                  haveEffect
                  persistOpen
                />
                <Button
                  className="cursor-pointer border !border-gray-500 hover:!bg-gray-500"
                  variant="outline"
                  onClick={() => setSrchMultiSelectValue([])}
                >
                  Reset
                </Button>
              </div>
            </div>
            <div className="grid gap-2">
              <span className="text-xl font-bold">TOAST</span>
              <Button
                className="w-1/4"
                onClick={() => toast.success("Hello World!", {
                  description: "Toast description",
                  duration: 3000,
                })}
              >
                Toast
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}