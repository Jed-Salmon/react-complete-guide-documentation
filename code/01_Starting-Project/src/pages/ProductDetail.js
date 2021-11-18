// access the parameter value entered in the url
import { useParams } from "react-router-dom";

const ProductDetail = () => {
  const params = useParams(); // returns param obj

  // params keys are the dynamic segments leading to that page
  console.log(params.productId);

  return (
    <section>
      <h1>Product Detail</h1>
      <p>{params.productId}</p>
    </section>
  );
};

export default ProductDetail;
