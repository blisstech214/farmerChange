import {
  FormControl,
  GoogleAutocomplete,
  SelectBox,
  TextBox,
  TimePickerBox,
  UploadFileBox,
} from "../../../../Components/form";
import { Add, Close } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardHeader,
  Divider,
  FormHelperText,
  Grid,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import dayjs from "dayjs";
import { isEmpty } from "lodash";
import moment from "moment";
import React from "react";
import { renderTimeViewClock } from '@mui/x-date-pickers/timeViewRenderers';

const MaterialSelect = [
  {
    label: "Choose Material",
    value: 0,
  },
  {
    label: "Liquid",
    value: "Liquid",
  },
  {
    label: "Solid",
    value: "Solid",
  },
  {
    label: "Gas",
    value: "Gas",
  },
  {
    label: "Solution",
    value: "Solution",
  },
  {
    label: "Other",
    value: "Other",
  },
];
const StepTwo = ({ formik, id, addProduct, removeProduct }) => {
  console.log(
    "momentmoment",

   formik.values
  );
  return (
    <>
      <Divider sx={{ my: 3 }} />
      <Box sx={{ mb: 3 }}>
        {formik?.values?.items &&
          formik?.values?.items?.length > 0 &&
          formik.values.items.map((productItem, productIndex) => {
            return (
              <Box key={productIndex} sx={{ mt: 1 }}>
                <Card
                  sx={{
                    borderRadius: "0px",
                    border: "0px",
                    boxShadow: "none",
                  }}
                >
                  <CardHeader
                    sx={{ mb: 3, p: 0, textAlign: "left" }}
                    action={
                      <IconButton onClick={() => removeProduct(productIndex)}>
                        <Close />
                      </IconButton>
                    }
                  />

                  <Grid container spacing={3}>
                    <Grid item md={6}>
                      <Box>
                        <TextBox
                          fullWidth
                          type="date"
                          label="Pickup Date"
                          InputLabelProps={{
                            shrink: true,
                          }}
                          value={productItem?.product?.pickup_date}
                          min={new Date().toISOString().split("T")[0]}
                          name={`items[${productIndex}].product.pickup_date`}
                          onChange={(e) => {
                            formik.setFieldValue(
                              `items[${productIndex}].product.pickup_date`,
                              e.target.value
                            );
                            formik.setFieldValue(
                              `items[${productIndex}].product.pickup_time`,
                              ""
                            );
                            formik.setFieldValue(
                              `items[${productIndex}].product.drop_date`,
                              ""
                            );
                            formik.setFieldValue(
                              `items[${productIndex}].product.drop_time`,
                              ""
                            );
                          }}
                          // onKeyDown={(event) => event.preventDefault()}
                          size={"small"}
                          helperText={
                            !isEmpty(formik.touched) &&
                            formik?.errors?.items &&
                            formik?.errors?.items?.length > 0 &&
                            formik?.errors?.items[productIndex]?.product
                              ?.index === productIndex &&
                            formik?.errors?.items[productIndex]?.product
                              ?.pickup_date
                          }
                        />
                      </Box>
                    </Grid>
                    <Grid item md={6}>
                      <Box>
                        <TimePickerBox
                          fullWidth
                          sx={{
                            "& .MuiOutlinedInput-input": {
                              padding: "8.5px 14px !important",
                            },
                          }}
                          variant="standard"
                          format="hh:mm a"
                          label="Pickup Time"
                          viewRenderers={{
                                  hours: renderTimeViewClock,
                                  minutes: renderTimeViewClock,
                                  seconds: renderTimeViewClock,
                                }}
                          value={productItem?.product?.pickup_time}
                          dateValue={
                            productItem?.product?.pickup_date ||
                            moment().format("YYYY-MM-DD")
                          }
                          InputLabelProps={{
                            shrink: true,
                          }}
                          name={`items[${productIndex}].product.pickup_time`}
                          onChange={(e) => {
                            formik.setFieldValue(
                              `items[${productIndex}].product.pickup_time`,
                              dayjs(e).format("hh:mm a")
                            );
                            formik.setFieldValue(
                              `items[${productIndex}].product.drop_time`,
                              ""
                            );
                          }}
                          size="small"
                          helperText={
                            !isEmpty(formik.touched) &&
                            formik?.errors?.items &&
                            formik?.errors?.items?.length > 0 &&
                            formik?.errors?.items[productIndex]?.product
                              ?.index === productIndex &&
                            formik?.errors?.items[productIndex]?.product
                              ?.pickup_time
                          }
                        />
                        {/* <FormControl
                          fullWidth
                          size="small"
                          error={
                            !isEmpty(formik.touched) &&
                            formik?.errors?.items &&
                            formik?.errors?.items?.length > 0 &&
                            formik?.errors?.items[productIndex]?.product
                              ?.index === productIndex &&
                            formik?.errors?.items[productIndex]?.product
                              ?.pickup_time
                          }
                        >
                          <TimePicker
                            sx={{
                              "& .MuiOutlinedInput-input": {
                                padding: "8.5px 14px !important",
                              },
                            }}
                            fullWidth
                            variant="standard"
                            format="hh:mm a"
                            label="Pickup Time"
                            value={
                              productItem?.product?.pickup_time
                                ? dayjs(
                                    `${
                                      productItem?.product?.pickup_date
                                    }T${moment(
                                      productItem?.product?.pickup_time,
                                      "hh:mm a"
                                    ).format("HH:mm")}`
                                  )
                                : null
                            }
                            InputLabelProps={{
                              shrink: true,
                            }}
                            name={`items[${productIndex}].product.pickup_time`}
                            onChange={(e) => {
                              formik.setFieldValue(
                                `items[${productIndex}].product.pickup_time`,
                                dayjs(e).format("hh:mm a")
                              );
                              formik.setFieldValue(
                                `items[${productIndex}].product.drop_time`,
                                ""
                              );
                            }}
                            size={"small"}
                            helperText={
                              !isEmpty(formik.touched) &&
                              formik?.errors?.items &&
                              formik?.errors?.items?.length > 0 &&
                              formik?.errors?.items[productIndex]?.product
                                ?.index === productIndex &&
                              formik?.errors?.items[productIndex]?.product
                                ?.pickup_time
                            }
                          />
                          <Box sx={{ display: "flex" }}>
                            {!isEmpty(formik.touched) &&
                              formik?.errors?.items &&
                              formik?.errors?.items?.length > 0 &&
                              formik?.errors?.items[productIndex]?.product
                                ?.index === productIndex &&
                              formik?.errors?.items[productIndex]?.product
                                ?.pickup_time && (
                                <FormHelperText>
                                  {!isEmpty(formik.touched) &&
                                    formik?.errors?.items &&
                                    formik?.errors?.items?.length > 0 &&
                                    formik?.errors?.items[productIndex]?.product
                                      ?.index === productIndex &&
                                    formik?.errors?.items[productIndex]?.product
                                      ?.pickup_time}
                                </FormHelperText>
                              )}
                          </Box>
                        </FormControl> */}
                      </Box>
                    </Grid>
                    <Grid item md={6}>
                      <Box>
                        <TextBox
                          fullWidth
                          type="date"
                          label="Drop Date"
                          InputLabelProps={{
                            shrink: true,
                          }}
                          value={productItem?.product?.drop_date}
                          name={`items[${productIndex}].product.drop_date`}
                          onChange={(e) => {
                            formik.setFieldValue(
                              `items[${productIndex}].product.drop_time`,
                              ""
                            );
                            formik.setFieldValue(
                              `items[${productIndex}].product.drop_date`,
                              e.target.value
                            );
                          }}
                          // onKeyDown={(event) => event.preventDefault()}
                          size={"small"}
                          helperText={
                            !isEmpty(formik.touched) &&
                            formik?.errors?.items &&
                            formik?.errors?.items?.length > 0 &&
                            formik?.errors?.items[productIndex]?.product
                              ?.index === productIndex &&
                            formik?.errors?.items[productIndex]?.product
                              ?.drop_date
                          }
                        />
                      </Box>
                    </Grid>
                    <Grid item md={6}>
                      <TimePickerBox
                        fullWidth
                        size="small"
                        sx={{
                          "& .MuiOutlinedInput-input": {
                            padding: "8.5px 14px !important",
                          },
                        }}
                        format="hh:mm a"
                        label="Drop Time"
                        value={productItem?.product?.drop_time}
                        dateValue={
                          productItem?.product?.drop_date ||
                          moment().format("YYYY-MM-DD")
                        }
                        InputLabelProps={{
                          shrink: true,
                        }}
                        name={`items[${productIndex}].product.drop_time`}
                        onChange={(e) => {
                          formik.setFieldValue(
                            `items[${productIndex}].product.drop_time`,
                            dayjs(e).format("hh:mm a")
                          );
                        }}
                        helperText={
                          !isEmpty(formik.touched) &&
                          formik?.errors?.items &&
                          formik?.errors?.items?.length > 0 &&
                          formik?.errors?.items[productIndex]?.product
                            ?.index === productIndex &&
                          formik?.errors?.items[productIndex]?.product
                            ?.drop_time
                        }
                      />
                      {/* <Box>
                        <FormControl
                          fullWidth
                          size="small"
                          error={
                            !isEmpty(formik.touched) &&
                            formik?.errors?.items &&
                            formik?.errors?.items?.length > 0 &&
                            formik?.errors?.items[productIndex]?.product
                              ?.index === productIndex &&
                            formik?.errors?.items[productIndex]?.product
                              ?.drop_time
                          }
                        >
                          <TimePicker
                            sx={{
                              "& .MuiOutlinedInput-input": {
                                padding: "8.5px 14px !important",
                              },
                            }}
                            fullWidth
                            format="hh:mm a"
                            label="Drop Time"
                            value={dayjs(
                              `${productItem?.product?.drop_date}T${moment(
                                productItem?.product?.drop_time,
                                "hh:mm a"
                              ).format("HH:mm")}`
                            )}
                            InputLabelProps={{
                              shrink: true,
                            }}
                            name={`items[${productIndex}].product.drop_time`}
                            onChange={(e) => {
                              formik.setFieldValue(
                                `items[${productIndex}].product.drop_time`,
                                dayjs(e).format("hh:mm a")
                              );
                            }}
                            size={"small"}
                            helperText={
                              !isEmpty(formik.touched) &&
                              formik?.errors?.items &&
                              formik?.errors?.items?.length > 0 &&
                              formik?.errors?.items[productIndex]?.product
                                ?.index === productIndex &&
                              formik?.errors?.items[productIndex]?.product
                                ?.drop_time
                            }
                          />
                          <Box sx={{ display: "flex" }}>
                            {!isEmpty(formik.touched) &&
                              formik?.errors?.items &&
                              formik?.errors?.items?.length > 0 &&
                              formik?.errors?.items[productIndex]?.product
                                ?.index === productIndex &&
                              formik?.errors?.items[productIndex]?.product
                                ?.drop_time && (
                                <FormHelperText>
                                  {!isEmpty(formik.touched) &&
                                    formik?.errors?.items &&
                                    formik?.errors?.items?.length > 0 &&
                                    formik?.errors?.items[productIndex]?.product
                                      ?.index === productIndex &&
                                    formik?.errors?.items[productIndex]?.product
                                      ?.drop_time}
                                </FormHelperText>
                              )}
                          </Box>
                        </FormControl>
                      </Box> */}
                    </Grid>
                    <Grid item md={6}>
                      <Box>
                        <TextBox
                          fullWidth
                          label="Quantity"
                          InputLabelProps={{
                            shrink: true,
                          }}
                          placeholder="Enter Quantity"
                          value={productItem?.product?.quantity}
                          name={`items[${productIndex}].product.quantity`}
                          onChange={(e) => {
                            formik.setFieldValue(
                              `items[${productIndex}].product.quantity`,
                              e.target.value.replace(/\D/gm, "")
                            );
                          }}
                          size="small"
                          helperText={
                            !isEmpty(formik.touched) &&
                            formik?.errors?.items &&
                            formik?.errors?.items?.length > 0 &&
                            formik?.errors?.items[productIndex]?.product
                              ?.index === productIndex &&
                            formik?.errors?.items[productIndex]?.product
                              ?.quantity
                          }
                        />
                      </Box>
                    </Grid>

                    <Grid item md={6}>
                      <Box>
                        <TextBox
                          fullWidth
                          label="Length (mm)"
                          placeholder="Enter Product Length (mm)"
                          value={productItem?.product?.length}
                          name={`items[${productIndex}].product.length`}
                          onChange={(e) => {
                            formik.setFieldValue(
                              `items[${productIndex}].product.length`,
                              e.target.value.replace(/\D/gm, "")
                            );
                          }}
                          size="small"
                          helperText={
                            !isEmpty(formik.touched) &&
                            formik?.errors?.items &&
                            formik?.errors?.items?.length > 0 &&
                            formik?.errors?.items[productIndex]?.product
                              ?.index === productIndex &&
                            formik?.errors?.items[productIndex]?.product?.length
                          }
                        />
                      </Box>
                    </Grid>
                    <Grid item md={6}>
                      <Box>
                        <TextBox
                          fullWidth
                          label="Width (mm)"
                          placeholder="Enter Product Width (mm)"
                          value={productItem?.product?.width}
                          name={`items[${productIndex}].product.width`}
                          onChange={(e) => {
                            formik.setFieldValue(
                              `items[${productIndex}].product.width`,
                              e.target.value.replace(/\D/gm, "")
                            );
                          }}
                          size="small"
                          helperText={
                            !isEmpty(formik.touched) &&
                            formik?.errors?.items &&
                            formik?.errors?.items?.length > 0 &&
                            formik?.errors?.items[productIndex]?.product
                              ?.index === productIndex &&
                            formik?.errors?.items[productIndex]?.product?.width
                          }
                        />
                      </Box>
                    </Grid>
                    <Grid item md={6}>
                      <Box>
                        <TextBox
                          fullWidth
                          label="Height (mm)"
                          placeholder="Enter Product Height (mm)"
                          value={productItem?.product?.height}
                          name={`items[${productIndex}].product.height`}
                          onChange={(e) => {
                            formik.setFieldValue(
                              `items[${productIndex}].product.height`,
                              e.target.value.replace(/\D/gm, "")
                            );
                          }}
                          size="small"
                          helperText={
                            !isEmpty(formik.touched) &&
                            formik?.errors?.items &&
                            formik?.errors?.items?.length > 0 &&
                            formik?.errors?.items[productIndex]?.product
                              ?.index === productIndex &&
                            formik?.errors?.items[productIndex]?.product?.height
                          }
                        />
                      </Box>
                    </Grid>
                    <Grid item md={6}>
                      <Box>
                        <Typography textAlign="left">Image Upload</Typography>
                        <UploadFileBox
                          fullWidth
                          url="api/auth/master/jobs/item-image"
                          accept="image/jpeg,image/png"
                          icon="upload"
                          disabled={true}
                          size="small"
                          value={productItem?.product?.image}
                          name={`items[${productIndex}].product.image`}
                          onChange={(e) => {
                            console.log(
                              "ProductImage",
                              e,
                              `items[${productIndex}].product.image`
                            );
                            formik.setFieldValue(
                              `items[${productIndex}].product.image`,
                              e
                            );
                          }}
                          helperText={
                            !isEmpty(formik.touched) &&
                            formik?.errors?.items &&
                            formik?.errors?.items?.length > 0 &&
                            formik?.errors?.items[productIndex]?.product
                              ?.index === productIndex &&
                            formik?.errors?.items[productIndex]?.product?.image
                          }
                        />
                      </Box>
                    </Grid>
                    <Grid item md={6}>
                      <Typography textAlign="left">Choose Material</Typography>
                      <Box>
                        <Stack direction="row" mb={1.3}>
                          <SelectBox
                            fullWidth
                            placeholder="Select"
                            size="small"
                            variant="standard"
                            value={productItem?.product?.material}
                            name={`items[${productIndex}].product.material`}
                            onChange={(e) => {
                              formik.setFieldValue(
                                `items[${productIndex}].product.material`,
                                e.target.value
                              );
                            }}
                            options={MaterialSelect}
                            vehicle="small"
                            helperText={
                              !isEmpty(formik.touched) &&
                              formik?.errors?.items &&
                              formik?.errors?.items?.length > 0 &&
                              formik?.errors?.items[productIndex]?.product
                                ?.index === productIndex &&
                              formik?.errors?.items[productIndex]?.product
                                ?.material
                            }
                          />
                        </Stack>
                      </Box>
                    </Grid>
                  </Grid>
                  <Box>
                    <Divider
                      sx={{
                        my: 2,
                      }}
                    />
                    <Typography
                      component="h5"
                      variant="h5"
                      fontSize={15}
                      fontWeight={400}
                      textAlign="left"
                    >
                      Add Delivery Address
                    </Typography>
                  </Box>
                  <Box sx={{ my: 4 }}>
                    {productItem?.address &&
                      productItem?.address?.length > 0 &&
                      productItem?.address.map((addressItem, addressIndex) => (
                        <Box key={productIndex} sx={{ mt: 1 }}>
                          <Card
                            sx={{
                              borderRadius: "0px",
                              border: "0px",
                              boxShadow: "none",
                            }}
                          >
                            <Grid container spacing={0}>
                              <Grid item md={12}>
                                <Stack
                                  direction="row"
                                  spacing={2}
                                  alignItems="center"
                                >
                                  <Typography fontSize={16}>
                                    Address Type :
                                  </Typography>
                                  <Typography fontSize={14}>
                                    {addressItem?.type}
                                  </Typography>
                                </Stack>
                              </Grid>

                              <Grid item md={12}>
                                <GoogleAutocomplete
                                  fullWidth
                                  size="small"
                                  labelName="Address"
                                  name={`items[${productIndex}].address[${addressIndex}].address`}
                                  value={addressItem?.address}
                                  onSelect={(address, lat, long) => {
                                    formik.setFieldValue(
                                      `items[${productIndex}].address[${addressIndex}].address`,
                                      address
                                    );
                                    formik.setFieldValue(
                                      `items[${productIndex}].address[${addressIndex}].lat`,
                                      lat
                                    );
                                    formik.setFieldValue(
                                      `items[${productIndex}].address[${addressIndex}].long`,
                                      long
                                    );
                                  }}
                                  onChange={(e) => {
                                    formik.setFieldValue(
                                      `items[${productIndex}].address[${addressIndex}].address`,
                                      e
                                    );
                                  }}
                                  endIcon={
                                    addressItem?.address && (
                                      <IconButton
                                        size="small"
                                        inputEndAdornmentPosition="end"
                                        onClick={() => {
                                          formik.setFieldValue(
                                            `items[${productIndex}].address[${addressIndex}].address`,
                                            ""
                                          );
                                          formik.setFieldValue(
                                            `items[${productIndex}].address[${addressIndex}].lat`,
                                            ""
                                          );
                                          formik.setFieldValue(
                                            `items[${productIndex}].address[${addressIndex}].long`,
                                            ""
                                          );
                                        }}
                                      >
                                        <Close fontSize="small" />
                                      </IconButton>
                                    )
                                  }
                                  helperText={
                                    !isEmpty(formik.touched) &&
                                    formik?.errors?.items &&
                                    formik?.errors?.items[productIndex]
                                      ?.address[addressIndex].address
                                  }
                                />
                              </Grid>
                            </Grid>
                          </Card>
                        </Box>
                      ))}
                  </Box>
                </Card>
              </Box>
            );
          })}
      </Box>
      <Box sx={{ textAlign: "left" }}>
        <Button
          variant="outlined"
          onClick={() => addProduct()}
          startIcon={<Add color="primary" />}
          color="primary"
        >
          Add Another
        </Button>
      </Box>
      <Divider sx={{ my: 3 }} />
    </>
  );
};

export default StepTwo;
