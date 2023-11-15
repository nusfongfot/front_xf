import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  IconButton,
  InputBase,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getProductsAPI, searchProductsAPI } from "@/api/products";
import SimpleBackdrop from "../loading";
import { useLoading } from "@/zustand/loading";
import { errorToast } from "@/utils/notification";
import { Products } from "@/types/product";
import { useProductsStore } from "@/zustand/products";

type Props = {};
function ProductLists({}: Props) {
  const { setLoading } = useLoading();
  const { products, setProducts } = useProductsStore();

  const router = useRouter();
  const [search, setSearch] = useState<string>("");

  const handleGetProducts = async () => {
    setLoading(true);
    try {
      const res = await getProductsAPI();
      if (res.res_code === "0000") {
        setProducts(res.data);
      }
    } catch (error: any) {
      errorToast(error.message, 2000);
    } finally {
      setLoading(false);
    }
  };

  const handleGetProductsBySearch = async (e: FormDataEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await searchProductsAPI(search);
      if (res.res_code === "0000") {
        setProducts(res.data);
      }
    } catch (error: any) {
      errorToast(error.message, 2000);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleGetProducts();
  }, []);
  return (
    <Container maxWidth="xl">
      <SimpleBackdrop />
      <Typography variant="h4" mt={5}>
        ProductLists
      </Typography>
      <Button
        size="small"
        variant="contained"
        sx={{ mt: 1 }}
        onClick={() => router.push("upload")}
      >
        upload product
      </Button>
      <Paper
        component="form"
        sx={{
          p: "2px 4px",
          display: "flex",
          alignItems: "center",
          width: "100%",
          borderRadius: "1.5rem",
          mt: 5,
          border: "1px solid #BCBCC0",
        }}
        onSubmit={(e: any) => handleGetProductsBySearch(e)}
      >
        <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
          <SearchIcon />
        </IconButton>

        <InputBase
          sx={{ flex: 1 }}
          placeholder="Name or Code"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          type="search"
        />
      </Paper>

      <Grid container spacing={3} mt={5}>
        {products.map((item) => (
          <Grid item xs={12} md={6} lg={4} xl={3} key={item.pro_id}>
            <Card sx={{ borderRadius: "1rem" }}>
              <CardMedia
                sx={{
                  height: 300,
                  objectFit: "contain",
                  backgroundPosition: "center",
                }}
                image={item.pro_images.split(",")[0]}
                title="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {item.pro_name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.pro_code}
                </Typography>
              </CardContent>
              <Stack
                flexDirection={"row"}
                justifyContent={"space-between"}
                p={2}
                alignItems={"center"}
              >
                <Button
                  size="small"
                  variant="contained"
                  onClick={() =>
                    router.push({
                      pathname: `/product/${item.pro_id}`,
                    })
                  }
                >
                  Learn More
                </Button>
                <Typography
                  sx={{ color: "#E13B30", fontWeight: 700 }}
                  variant="h5"
                >
                  ฿{item.pro_price.toLocaleString("en")}
                </Typography>
              </Stack>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
export default ProductLists;
