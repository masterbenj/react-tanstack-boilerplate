import z from "zod"

export const optionSchema = z.union([
  z.object({
    label: z.string(),
    value: z.string(),
    isDisabled: z.union([
      z.boolean(),
      z.undefined()
    ])
  }),
  z.null(),
])

export type Option = z.infer<typeof optionSchema>

export type BaseSelectProps = {
  placeholder ?:  string
  options     :   Option[]
  className   ?:  string
  /** to add effects like border color depends on param (e.g have value, isOptional, readOnly, etc.) */
  haveEffect  ?:  boolean
  disabled    ?:  boolean
  readOnly    ?:  boolean
  isOptional  ?:  boolean
}