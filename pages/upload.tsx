import {
  Box,
  Button,
  Container,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { useRouter } from "next/router";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { Products } from "@/types/product";
import { errorToast, successToast } from "@/utils/notification";
import { createProductAPI } from "@/api/products";
import { useProductsStore } from "@/zustand/products";
import { useLoading } from "@/zustand/loading";
import SimpleBackdrop from "@/components/loading";
type Props = {};
function UploadProductPage({}: Props) {
  const router = useRouter();
  const { setLoading, isLoading } = useLoading();
  const { setProducts, products } = useProductsStore();

  const fileInputRef: any = useRef(null);

  const [values, setValues] = useState({
    pro_name: "",
    pro_code: "",
    pro_price: "",
    pro_description: "",
  });
  const [images, setImages] = useState<any[]>([]);
  const [isDis, setIsDis] = useState<boolean>(true);

  const handleSpanClick = () => {
    fileInputRef.current.click();
  };

  const handleChangeValues = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles: any = event.target.files;
    setImages([...images, ...selectedFiles]);
  };

  const handleOnClickConfirm = async () => {
    setLoading(true);
    try {
      const formData: FormData = new FormData();
      formData.append("pro_name", values.pro_name);
      formData.append("pro_code", values.pro_code);
      formData.append("pro_price", values.pro_price);
      formData.append("pro_description", values.pro_description);
      images.forEach((img, i) => {
        formData.append("images", img);
      });
      const res = await createProductAPI(formData);
      if (res.res_code == "0000") {
        setProducts([res.data, ...products]);
        successToast(res.message, 2000);
      }
    } catch (error: any) {
      errorToast(error.message, 2000);
    } finally {
      setLoading(false);
      setValues({
        pro_name: "",
        pro_code: "",
        pro_price: "",
        pro_description: "",
      });
      setImages([]);
    }
  };

  const handleCanCel = () => {
    setValues({
      pro_name: "",
      pro_code: "",
      pro_price: "",
      pro_description: "",
    });
    setImages([]);
  };
  useEffect(() => {
    if (
      values.pro_code &&
      values.pro_name &&
      values.pro_description &&
      values.pro_price &&
      images.length > 0
    ) {
      setIsDis(false);
    }
  }, [values, images]);
  return (
    <Container maxWidth="xl">
      {isLoading && <SimpleBackdrop />}
      <Typography variant="h4" mt={5}>
        Upload Product
      </Typography>
      <Button size="small" variant="contained" onClick={() => router.push("/")}>
        Product Page
      </Button>
      <Typography mt={5}>Upload image</Typography>
      <Paper
        sx={{
          border: "1px dashed #D9D9D9",
          borderRadius: "0.5rem",
          height: 280,
        }}
      >
        <Stack justifyContent={"center"} alignItems={"center"} height={"100%"}>
          <FileUploadIcon sx={{ color: "#6C6C70", fontSize: 30 }} />
          <Typography sx={{ color: "#6C6C70", mt: 2 }}>
            Drag & Drop or{" "}
            <span
              style={{
                textDecoration: "underline",
                textDecorationColor: "#005FCC",
                color: "#005FCC",
                cursor: "pointer",
              }}
              onClick={handleSpanClick}
            >
              Choose File
            </span>{" "}
            to upload
          </Typography>
          <Typography variant="subtitle2" sx={{ color: "#6C6C70", mt: 1 }}>
            JPG or PNG Maximum file size 50MB.
          </Typography>

          <input
            type="file"
            multiple
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
        </Stack>
      </Paper>
      <Stack flexDirection={"row"} justifyContent={"flex-end"}>
        <Typography sx={{ color: "#6C6C70", mt: 1 }}>
          {`Image upload (${0 || images.length})`}
        </Typography>
      </Stack>

      <Box mt={2}>
        <Typography>Product name</Typography>
        <TextField
          size="small"
          fullWidth
          InputProps={{ sx: { borderRadius: 50 } }}
          name="pro_name"
          value={values.pro_name}
          onChange={handleChangeValues}
        />
        <Typography mt={2}>Code</Typography>
        <TextField
          size="small"
          fullWidth
          InputProps={{ sx: { borderRadius: 50 } }}
          name="pro_code"
          value={values.pro_code}
          onChange={handleChangeValues}
          type="number"
        />
        <Typography mt={2}>Price</Typography>
        <TextField
          type="number"
          size="small"
          fullWidth
          InputProps={{ sx: { borderRadius: 50 } }}
          name="pro_price"
          value={values.pro_price}
          onChange={handleChangeValues}
        />
        <Typography mt={2}>Description</Typography>
        <TextField
          size="small"
          fullWidth
          InputProps={{ sx: { borderRadius: 50 } }}
          multiline
          maxRows={3}
          name="pro_description"
          value={values.pro_description}
          onChange={handleChangeValues}
        />
        <Stack
          flexDirection={"row"}
          justifyContent={"center"}
          alignItems={"center"}
          mt={2}
          gap={3}
        >
          <Button
            variant="outlined"
            size={"small"}
            sx={{
              border: "1px solid #D9D9D9",
              color: "#E13B30",
              borderRadius: "1.5rem",
              width: 150,
              ":hover": {
                border: "1px solid #D9D9D9",
                backgroundColor: "white",
              },
            }}
            onClick={handleCanCel}
          >
            ยกเลิก
          </Button>
          <Button
            variant="contained"
            size={"small"}
            sx={{
              border: "1px solid #D9D9D9",
              color: "white",
              borderRadius: "1.5rem",
              width: 150,
              backgroundColor: "#E04132",
              ":hover": {
                backgroundColor: "#E04132",
              },
            }}
            onClick={handleOnClickConfirm}
            disabled={isDis}
          >
            ยืนยัน
          </Button>
        </Stack>
      </Box>
    </Container>
  );
}
export default UploadProductPage;
