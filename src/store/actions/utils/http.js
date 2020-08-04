import { url } from "../../../globalVars";

const httpReq = async (path, method, body) => {
  try {
    let response = await fetch(url + path, {
      method,
      body,
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log(body)
    if (response.status !== 200) {
      throw Error();
    } else {
      let data = [];
      if (method !== "POST") data = await response.json();

      return { data: data, error: false };
    }
  } catch (error) {
    return { data: null, error: true };
  }
  //   if (response.status !== 200) throw Error();
  //   else return { data: response, error: false };
  // } catch (error) {
  //   return { data: null, error: true };
  // }
};

export default httpReq;
