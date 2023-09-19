import { connect } from "react-redux";
import {
  start_loading,
  stop_loading,
} from "../../middlewares/auth-middlewares";
import { Spinner } from "@chakra-ui/spinner";
import { PageManagementProduct } from "../../pages/managementproduct/managementproduct";

export const LoadingItem = () => {
  return <>import {Spinner} from '@chakra-ui/react'</>;
};

const mapStateToProps = (state) => ({
  isLoading: state.loading.isLoading,
});

export default connect(mapStateToProps, { start_loading, stop_loading })(
  PageManagementProduct
);
