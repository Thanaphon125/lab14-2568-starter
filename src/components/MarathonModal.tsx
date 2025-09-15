import {
  Modal,
  Stack,
  TextInput,
  Radio,
  Select,
  Checkbox,
  Alert,
  Button,
  PasswordInput,
  Text,
  Divider,
  Group,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useMarathonFormStore } from "../store/MarathonFormStore";
import { zod4Resolver } from "mantine-form-zod-resolver";
import { marathonSchema } from "../zod/MarathonSchema";
import { useEffect, useState } from "react";
import { type MarathonModalProps } from "../libs/Marathon";
export default function MarathonModal({ opened, onClose }: MarathonModalProps) {
  const [agree, setAgree] = useState(false);
  const {
    fname,
    lname,
    plan,
    gender,
    email,
    total,
    haveCoupon,
    couponCode,
    password,
    confirmPassword,
    setFname,
    setLname,
    setpassword,
    setconfirmPassword,
    setPlan,
    setGender,
    setEmail,
    sethaveCoupon,
    setcouponCode,
    discountCupon,
    reset,
  } = useMarathonFormStore();

  // Mantine Form
  const mantineForm = useForm({
    initialValues: {
      fname,
      lname,
      password,
      confirmPassword,
      plan,
      gender,
      agree,
      email,
      haveCoupon,
      couponCode,
    },
    validate: zod4Resolver(marathonSchema),
    validateInputOnChange: true,
  });
  // update Zustand form real-time
  useEffect(() => {
  discountCupon();
}, [mantineForm.values, discountCupon]);

  const onSubmitRegister = () => {
    //  alert หลังจาก กด Register
     alert("Register See you at CMU Marathon");
      onClose();
    reset();
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title="Register CMU Marathon 🏃‍♂️"
      centered
      size="xl"
    >
      <form onSubmit={mantineForm.onSubmit(onSubmitRegister)}>
        <Stack>
          <Group justify="space-between" gap="xs" grow>
            <TextInput
              label="First name"
              withAsterisk
              value={fname}
              onChange={(e) => {
                setFname(e.currentTarget.value);
                mantineForm.setFieldValue("fname", e.currentTarget.value);
              }}
              error={mantineForm.errors.fname}
            />
            <TextInput
              label="Last name"
              withAsterisk
              value={lname}
              onChange={(e) => {
                setLname(e.currentTarget.value);
                mantineForm.setFieldValue("lname", e.currentTarget.value);
              }}
              error={mantineForm.errors.lname}
            />
          </Group>
          <TextInput
            label="Email"
            withAsterisk
            description="ex.excemble@email.com"
            value={email}
            onChange={(e) => {
              setEmail(e.currentTarget.value);
              mantineForm.setFieldValue("email", e.currentTarget.value);
            }}
            error={mantineForm.errors.email}
          />
          {/* PasswordInput */}
          <PasswordInput
            label="Password"
            description="Password must contain 6-12 charaters"
            withAsterisk
            value = {password}
             onChange={(e) => {
              setpassword(e.currentTarget.value);
              mantineForm.setFieldValue("password", e.currentTarget.value);
            }}
            error={mantineForm.errors.password}
          />
          <PasswordInput
            label="Confirm Password"
            description="Confirm Password"
              withAsterisk
             value={confirmPassword}
              onChange={(e) => {
              setconfirmPassword(e.currentTarget.value);
              mantineForm.setFieldValue(
                "confirmPassword",
                e.currentTarget.value
              );
            }}
            error={mantineForm.errors.confirmPassword}
          />
          <Select
            label="Plan"
            placeholder="Please select.."
            data={[
              { value: "funrun", label: "Fun run 5.5 Km (500 THB)" },
              { value: "mini", label: "Mini Marathon 10 Km (800 THB)" },
              { value: "half", label: "Half Marathon 21 Km (1,200 THB)" },
              { value: "full", label: "Full Marathon 42.195 Km (1,500 THB)" },
            ]}
            value={plan}
            onChange={(value) => {
              if (value !== null) {
                const v = value as "funrun" | "mini" | "half" | "full";
                setPlan(value as "funrun" | "mini" | "half" | "full");
                mantineForm.setFieldValue("plan", v);
              }
            }}
            error={mantineForm.errors.plan}
          />

          <Radio.Group
            label="Gender"
            value={gender}
            onChange={(value) => {
              if (value !== null) {
                const v = value as "male" | "female";
                setGender(v);
                mantineForm.setFieldValue("gender", v);
              }
            }}
            error={mantineForm.errors.gender}
          >
            <Radio m={4} value="male" label="Male 👨" />
            <Radio m={4} value="female" label="Female 👩" />
          </Radio.Group>

          <Alert color="blue" title="Promotion 📢">
            Coupon (30% Discount)
          </Alert>
          {/* เลือกกรออก coupon ตรงนี้ */}
          <Checkbox label="I have coupon"
          onChange={(value) => {
            sethaveCoupon(value.currentTarget.checked);
            mantineForm.setFieldValue("haveCoupon" ,
              value.currentTarget.checked
            )
          }}
          checked = {haveCoupon}
          />

          {/* จะต้องแสดงเมื่อกด เลือก I have coupon เท่านั้น*/}
          {haveCoupon && (
            <TextInput
              label="Coupon Code"
              onChange={(value) => {
                setcouponCode(value.currentTarget.value);
                mantineForm.setFieldValue(
                  "couponCode",
                  value.currentTarget.value
                );
              }}
              error={mantineForm.errors.couponCode}
              value={couponCode}
            />
          )}

          {/* แสดงราคาการสมัครงานวิ่งตามแผนที่เลือก  */}
          <Text>Total Payment : {total}THB</Text>
          <Divider my="xs" variant="dashed" />
          <Checkbox
            label={
              <>
                I accept
                <Text mx={2} span c="red" inherit>
                  terms and conditions
                </Text>
              </>
            }
            checked={agree}
            onChange={(e) => {
              setAgree(e.currentTarget.checked);
              mantineForm.setFieldValue("agree", e.currentTarget.checked);
            }}
            error={mantineForm.errors.agree}
          />
          <Button type="submit" disabled={!mantineForm.values.agree}>
            Register
          </Button>
        </Stack>
      </form>
    </Modal>
  );
}
