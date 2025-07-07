import { useQuery, useMutation } from "@tanstack/react-query";
import { fetchSiteConfig, updateSiteConfig } from "src/api/siteConfig";
import { useEffect, useState } from "react";
import AdminContainer from "src/components/ui/AdminContainer";

import { GrConfigure } from "react-icons/gr";
import TransparentBtn from "src/components/ui/TransparentBtn";
import { COLORS } from "src/services/defaultSettings";

import Alert from "src/components/ui/Alert";
const SiteConfigForm = () => {
  const { data: config, isLoading } = useQuery({
    queryKey: ["siteConfig"],
    queryFn: fetchSiteConfig,
  });

  const [formData, setFormData] = useState({
    facebook: "",
    instagram: "",
    tiktok: "",
    whatsappNumber: "",
    whatsappChannel: "",
    shippingPriceCairoAndGiza: "",
    generalShippingPrice: "",
    nextItemFees: "",
  });

  useEffect(() => {
    if (isLoading) return;
    setFormData({ ...config });
  }, [config]);

  const mutation = useMutation({
    mutationFn: updateSiteConfig,
    onSuccess: () => {
      Alert("Success", "Settings updated successfully", "success", "Done");
    },
    onError: (err) => {
      alert("Error: " + err.message);
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate(formData);
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <AdminContainer Icon={<GrConfigure />} title={"Site Config"}>
      <form
        onSubmit={handleSubmit}
        className="mx-auto w-[50%] space-y-6 rounded-xl bg-white p-6 shadow"
      >
        {[
          { name: "facebook", label: "Facebook URL" },
          { name: "instagram", label: "Instagram URL" },
          { name: "tiktok", label: "TikTok URL" },
          { name: "whatsappNumber", label: "WhatsApp Number" },
          { name: "whatsappChannel", label: "WhatsApp Channel URL" },
          {
            name: "shippingPriceCairoAndGiza",
            label: "Shipping Price (Cairo & Giza)",
            type: "number",
          },
          {
            name: "generalShippingPrice",
            label: "General Shipping Price",
            type: "number",
          },
          {
            name: "nextItemFees",
            label: "Next Item Fees",
            type: "number",
          },
          {
            name: "invoiceEndedHours",
            label: "Invoice Ended Hours",
            type: "number",
          },
        ].map(({ name, label, type = "text" }) => (
          <div key={name} className="flex flex-col gap-1">
            <label htmlFor={name} className="text-sm font-medium text-gray-700">
              {label}
            </label>
            <input
              id={name}
              name={name}
              type={type}
              value={formData[name]}
              onChange={handleChange}
              placeholder={label}
              className="rounded-md border border-gray-300 px-4 py-2 transition-all duration-300 focus:border-main-color focus:outline-none"
            />
          </div>
        ))}

        <TransparentBtn
          bgColor={COLORS["secondColor"]}
          type="submit"
          className="w-full text-white"
        >
          Save Settings
        </TransparentBtn>
      </form>
    </AdminContainer>
  );
};

export default SiteConfigForm;
