import { useParams, useNavigate } from 'react-router-dom'
import { ApiConstants } from '../../constants/ApiConstants';
import axiosConfig from "../../util/AxiosConfig/AxiosConfig";
import { PathConstants } from '../../constants/PathConstants';

const ForwardForgotPasswordRequestComponent = () => {
  const { resetPasswordToken } = useParams();
  const navigator = useNavigate();

  const forwardForgotPasswordRequest = async () => {
    try {
      const response = await axiosConfig.post(ApiConstants.FORGOT_PASSWORD_VERIFY_TOKEN, {
        resetPasswordToken: resetPasswordToken,
      });
      console.log(response.data);
      const token = response.data["resetPasswordToken"];
      navigator(PathConstants.RESET_PASSWORD, { state : { token }});
    } catch (error) {
      console.log(error);
    }
  };

  forwardForgotPasswordRequest();
}

export default ForwardForgotPasswordRequestComponent;