import { commonAPI } from "../services/commonAPI"
import { serverUrl } from "../services/serverUrl"

export const sendOtp = async(reqBody)=>{
    return await commonAPI('post',`${serverUrl}/api/sendOtp`,reqBody,"")
}

export const verifyOtp = async(reqBody)=>{
    return await commonAPI('post',`${serverUrl}/api/verifyOtp`,reqBody,"")
}

export const registerAPI = async(reqBody)=>{
    return await commonAPI('post',`${serverUrl}/api/register`,reqBody,"")
}


export const loginAPI = async(reqBody)=>{
    return await commonAPI('post',`${serverUrl}/api/login`,reqBody,"")
}

// export const adminLoginAPI = async(reqBody)=>{
//     return await commonAPI('post',`${serverUrl}/api/admin`,reqBody,"")
// }

export const driverRegisterAPI = async(reqBody)=>{
    return await commonAPI('post',`${serverUrl}/api/driverRegister`,reqBody,"")
}

export const driverLoginAPI = async(reqBody)=>{
    return await commonAPI('post',`${serverUrl}/api/driverLogin`,reqBody,"")
}

export const getUsersInAdminAPI = async(reqBody)=>{
    return await commonAPI('get',`${serverUrl}/api/getUsersInAdmin`,reqBody,"")
}

export const getdriversInAdminAPI = async(reqBody)=>{
    return await commonAPI('get',`${serverUrl}/api/getDriversInAdmin`,reqBody,"")
}



export const addUserBookingAPI = async(reqBody,reqHeader)=>{
    return await commonAPI('post',`${serverUrl}/api/addBooking`,reqBody,reqHeader)
}


export const getAllBookingsInDriverAPI = async(reqHeader)=>{
    return await commonAPI('get',`${serverUrl}/api/getAllBookingsInDriver`,"",reqHeader)
}


//Accept Booking
export const acceptBookingAPI = async (bookingId, reqBody) => {
    const url = `${serverUrl}/api/bookings/${bookingId}/accept`;
    return await commonAPI('post', url, reqBody, {});
};


//GEt current bookigs of Driver
export const getCurrentBookingsByDriverAPI = async (driverId) => {
    return await commonAPI('get', `${serverUrl}/api/driver/${driverId}/currentBookings`);
  };




// Fetch user bookings (accepted only)
export const getUserBookingsAPI = async (userId) => {
    return await commonAPI('get', `${serverUrl}/api/user/${userId}/bookings`);
  };




  //completed
  export const completeBookingAPI = async (bookingId) => {
    return await commonAPI('patch',`${serverUrl}/api/bookings/complete/${bookingId}`);
   
};


//cancel
export const cancelBookingAPI = async (bookingId) => {
  return await commonAPI('put',`${serverUrl}/api/cancel/${bookingId}`);
};


export const getBookingsByUserAPI = async (userId) => {
    return await commonAPI('get',`${serverUrl}/api/bookings/${userId}`);
  };
  


  export const updateDriverStatusAPI = async(driverId,status) => {
    return await commonAPI('patch',`${serverUrl}/api/drivers/updateStatus/${driverId}`,status)
  };

