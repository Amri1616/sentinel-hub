import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Role } from "@/lib/auth";
import { getRoleConfig } from "@/lib/roleConfig";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function OtpVerification() {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const role = (location.state?.role || "reporter") as Role;
  const config = getRoleConfig(role);
  const demoOtp = location.state?.otp || "123456";

  const [otp, setOtp] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);

  const handleVerify = () => {
    if (otp.length !== 6) {
      toast.error(t("Please enter the full 6-digit OTP"));
      return;
    }
    setIsVerifying(true);
    setTimeout(() => {
      if (otp === demoOtp) {
        toast.success(t("MFA verification successful"));
        navigate(`${config.basePath}/dashboard`);
      } else {
        toast.error(t("Invalid OTP. Please try again."));
        setOtp("");
      }
      setIsVerifying(false);
    }, 500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        <Button
          variant="ghost"
          onClick={() => navigate("/login", { state: { role } })}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          {t("Back to Login")}
        </Button>

        <Card className="border-2" style={{ borderColor: `${config.color}40` }}>
          <CardHeader className="space-y-4">
            <div
              className="h-16 w-16 rounded-2xl mx-auto flex items-center justify-center"
              style={{ backgroundColor: `${config.color}20` }}
            >
              <ShieldCheck
                className="h-8 w-8"
                style={{ color: config.color }}
              />
            </div>
            <div className="text-center space-y-2">
              <CardTitle className="text-2xl">
                {t("MFA Verification")}
              </CardTitle>
              <CardDescription className="text-base pt-2">
                {t(
                  "Enter the 6-digit one-time password to verify your identity."
                )}
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex justify-center">
              <InputOTP maxLength={6} value={otp} onChange={setOtp}>
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            </div>

            <Button
              className="w-full"
              // disabled={isVerifying || otp.length !== 6}
              onClick={handleVerify}
              style={{
                backgroundColor: config.color,
                color: "hsl(222 47% 3%)",
              }}
            >
              {isVerifying ? t("Verifying...") : t("Verify & Continue")}
            </Button>

            <div className="rounded-lg border bg-muted/50 p-4 space-y-2">
              <p className="text-sm font-medium text-foreground">
                {t("Demo OTP Code")}
              </p>
              <p
                className="text-2xl font-mono font-bold tracking-[0.5em] text-center"
                style={{ color: config.color }}
              >
                {demoOtp}
              </p>
              <p className="text-xs text-muted-foreground text-center">
                {t(
                  "Enter this code above to proceed. In production, this would be sent via email or SMS."
                )}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
