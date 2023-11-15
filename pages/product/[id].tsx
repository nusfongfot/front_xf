import { getProductByIdAPI } from "@/api/products";
import SimpleBackdrop from "@/components/loading";
import MySwiper from "@/components/swiper";
import { Products } from "@/types/product";
import { errorToast } from "@/utils/notification";
import { useLoading } from "@/zustand/loading";
import { Container, Stack, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

type Props = {};
export default function ProductDetails({}: Props) {
  const router = useRouter();
  const idProduct: any = router.query.id;

  const { setLoading, isLoading } = useLoading();
  const [product, setProduct] = useState<Products[]>([]);

  useEffect(() => {
    (async () => {
      if (router.isReady) {
        setLoading(true);
        try {
          const res = await getProductByIdAPI(idProduct);
          setProduct(res.data);
        } catch (error: any) {
          errorToast(error.message, 2000);
        } finally {
          setLoading(false);
        }
      }
    })();
  }, [idProduct]);

  return (
    <Container maxWidth="xl">
      {isLoading && <SimpleBackdrop />}
      <Typography mt={5} variant="h4">
        {product[0]?.pro_name}
      </Typography>
      <MySwiper product={product} />
      <Stack
        flexDirection={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Typography mt={2} variant="h5">
          {`ProductCode ${product[0]?.pro_code}`}
        </Typography>
        <Typography mt={2} variant="h5">
          ฿{product[0]?.pro_price.toLocaleString("en")}
        </Typography>
      </Stack>
      <Typography mt={2} variant="h5">
        {product[0]?.pro_description}
      </Typography>
    </Container>
  );
}
