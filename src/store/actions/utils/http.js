import { url } from "../../../globalVars";

const httpReq = async (path, method, body) => {
  console.log(body)
  try {
    let response = await fetch(url + path, {
      method,
      body,
      headers: {
        "Content-Type": "application/json",
      },
    });
    
    if (response.status !== 200) {
      console.log(response)
      throw Error(response.status);
      
    } else {
      let data = [];
      if (method !== "POST") data = await response.json();

      return { data: data, error: false };
    }
  } catch (error) {
    console.log(error)
    return { data: null, error: true };
  }
  //   if (response.status !== 200) throw Error();
  //   else return { data: response, error: false };
  // } catch (error) {
  //   return { data: null, error: true };
  // }
};

export default httpReq;
