import { Grid, FormControl, InputLabel, Select, MenuItem, Box } from "@material-ui/core";
import React, { useContext } from "react";
import { Controller } from "react-hook-form";
import FormContext from "../FormContext";
import { DropdownProps, ObjectLike } from "../types";
import { toCapital } from "../utils";
import { componentGridStyle, toolTipChildStyle } from "../styles";

/**
 * Creates an Dropdown subcomponent
 * @param name your schema field name
 * @param title your schema field title
 * @param items an array of objects with a name and value property
 * @param style optional style object
 * @param options optional options object
 * @param children optional children components
 * @param size optional size of the component
 */
export function FormDropdown<T extends ObjectLike>({ name, title, items, style, options, children, size = 4 }: DropdownProps<T>) {
  const { ctx } = useContext(FormContext);
  return (
    <Grid item xs={12} sm={12} md={size} style={componentGridStyle}>
      <FormControl variant="outlined" fullWidth required>
        <Controller
          name={name}
          control={ctx.control}
          render={({ field }) => (
            <>
              <InputLabel htmlFor={`${name}-dropdown`}>{toCapital(name)}</InputLabel>
              <Box display="flex" alignItems="center">
                <Select
                  id={`${name}-dropdown`}
                  inputProps={{ 'aria-label': `${name}-dropdown` }}
                  label={title || toCapital(name)}
                  style={style}
                  {...field}
                  {...options}
                  fullWidth 
                >
                  {items.map((item: any) => (
                    <MenuItem
                      key={item.value}
                      value={item.value}
                      aria-label={`${name}-option-${item.value.toLowerCase()}`}
                    >
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
                {children && ( 
                  <Box ml={1} style={toolTipChildStyle}>
                    { children }
                  </Box>
                )}
              </Box>
            </>
          )}
        />
      </FormControl>
    </Grid>
  )
}
