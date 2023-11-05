import { CreateUserRequestDto } from "../models/CreateUserRequestDto";
import {
  CreateUserResponseDtoFromJSON,
  UserType,
} from "../models/CreateUserResponseDto";
import * as runetime from "../runtime";
import { ErrorResult, SuccessResult } from "../runtimeType";

class _AuthApi extends runetime.BaseAPI {
  constructor() {
    super();
  }
  async createUser(
    requestParameters: CreateUserRequestDto
  ): Promise<SuccessResult<UserType> | ErrorResult> {
    const response = await this.request({
      url: `/auth/create-user`,
      method: "POST",
      data: requestParameters,
    });
    if (response.remote === "success") {
      return {
        remote: "success",
        data: {
          message: response.data.message,
          status: response.data.status,
          data: CreateUserResponseDtoFromJSON(response.data.data),
        },
      };
    }
    return response as ErrorResult;
  }
}
