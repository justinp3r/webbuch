import { V2_MetaFunction, json, redirect } from "@remix-run/node";
import type { ActionArgs } from "@remix-run/node";
import Api from "../api";
import { Form } from "@remix-run/react";
import { useNavigation } from "@remix-run/react";
import { getSession, commitSession } from "../sessions";
import { Constants } from "utils/constants";



export async function action({ request }: ActionArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  const body = await request.formData();
  const email = body.get("email");
  const password = body.get("password");
  console.log(email);
  const payload = {
    email,
    password,
  };

  console.log(typeof email);

  const api = new Api();
  try {
    const response = await api.loginUser(payload);
    const sessionPayload = {
      token: response.data.access_token,
      user: {
        email: response.data.user.email,
        name: response.data.user.name,
      },
    };
    console.log(response.data.access_token);
    session.set("credentials", sessionPayload);
    return redirect("/dashboard", {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    });
  } catch (error: any) {
    console.log(error);
    return json(error.response.data);
  }
}

export default function Login() {
  const navigation = useNavigation();

  return (
    <div>
      <h2>Login</h2>
      <Form method="post">
        <input type="text" placeholder="Email" name="email" />
        <input type="password" placeholder="Password" name="password" />
        <button type="submit">
          {navigation.state === "submitting" ? "Loading..." : "Login"}
        </button>
      </Form>
    </div>
  );
}
