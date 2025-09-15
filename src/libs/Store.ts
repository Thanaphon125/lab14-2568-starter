import { type MarathonForm } from "../zod/MarathonSchema";
interface MarathonFormState {
  fname: string;
  lname: string;
  plan: "funrun" | "mini" | "half" | "full";
  gender: "male" | "female";
  email: string;
  total: number;
  haveCoupon: boolean;
  couponCode: string;
  password: string;
  confirmPassword: string;
  // Setters
  setFname: (v: string) => void;
  setLname: (v: string) => void;
  setPlan: (v: MarathonForm["plan"]) => void;
  setGender: (v: MarathonForm["gender"]) => void;
  setEmail: (v: string) => void;
  sethaveCoupon: (v: boolean) => void;
  setcouponCode: (v: string) => void;
  setconfirmPassword: (v: string) =>  void;
  setpassword: (v: string) => void;
  // Function ชื่อ discountCupon คำนวณ total ตรงนี้
  reset: () => void;
  discountCupon:() => void;
}
export type { MarathonFormState }