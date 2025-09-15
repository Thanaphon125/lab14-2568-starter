import { create } from "zustand";
import { type MarathonFormState } from "../libs/Store";
export const useMarathonFormStore = create<MarathonFormState>((set) => ({
  fname: "",
  lname: "",
  password: "",
  confirmPassword: "",
  plan: "funrun",
  gender: "male",
  email: "",
  haveCoupon: false,
  couponCode: "",
  total: 0,
  setFname: (fname) =>
    set(() => ({
      fname: fname,
    })),
  setLname: (_lname) =>
    set(() => ({
      lname: _lname,
    })),
  setpassword: (_password) =>
    set(() => ({
      password: _password,
    })),
  setconfirmPassword: (_confirmPassword) =>
    set(() => ({
      confirmPassword: _confirmPassword,
    })),
  setPlan: (_plan) =>
    set(() => ({
      plan: _plan,
    })),
  setGender: (_gender) =>
    set(() => ({
      gender: _gender,
    })),
  setEmail: (_email) =>
    set(() => ({
      email: _email,
    })),
  sethaveCoupon: (_haveCoupon) =>
    set(() => ({
      haveCoupon: _haveCoupon,
    })),
  setcouponCode: (_couponCode) =>
    set(() => ({
      couponCode: _couponCode,
    })),
  // Function ชื่อ discountCupon คำนวณ total ตรงนี้
  discountCupon: () =>
    set((state) => {
      let totalPayment = 0;
        if (state.plan === "funrun") totalPayment += 500;
      if (state.plan === "mini") totalPayment += 800;
      if (state.plan === "half") totalPayment += 1200;
      if (state.plan === "full") totalPayment += 1500;

      if (state.haveCoupon && state.couponCode === "CMU2025")
        totalPayment *= 0.7;

      return { total: totalPayment };
      //  return object ซึ่ง object ต้องใช้ {ระบุ key : value } ในการสร้าง
    }),
  reset: () =>
    set({
      fname: "",
      lname: "",
      plan: "funrun",
      gender: "male",
      email: "",
      haveCoupon: false,
      couponCode: "",
      password: "",
      confirmPassword: "",
    }),
}));
