import { url } from '../../../globalVars';

const httpReq = async (path, method, body) => {
  try {
    let response = await fetch(url + path, {
      method,
      body,
      headers: {
        "Content-Type": "application/json",
      },
    });
    
    
    let data = await response.json();

    if (data.status) throw Error();
    else return { data: data, error: false };
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
