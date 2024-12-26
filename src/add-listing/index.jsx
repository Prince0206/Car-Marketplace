import React, { useEffect, useState } from "react";
import Header from "@/components/Header";
import carDetails from "../Shared/carDetails.json";
import InputField from "./components/InputField";
import DropdownField from "./components/DropdownField";
import TextAreaField from "./components/TextAreaField";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import features from "./../Shared/features.json";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { db } from "./../../configs";
import { CarImages, CarListing } from "./../../configs/schema";
import IconField from "./components/IconField";
import UploadImages from "./components/UploadImages";
import { BiLoaderAlt } from "react-icons/bi";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import moment from "moment";
import { toast } from "sonner";
import { eq } from "drizzle-orm";
import Service from "@/Shared/Service";

function AddListing() {
  const [formData, setFormData] = useState({});
  const [featuresData, setFeaturesData] = useState({});
  const [triggerUploadImages, setTriggerUploadImages] = useState();
  const [searchParams] = useSearchParams();
  const [loader, setLoader] = useState(false);
  const [carInfo, setCarInfo] = useState();
  const navigate = useNavigate();
  const { user } = useUser();

  const mode = searchParams.get("mode");
  const recordId = searchParams.get("id");

  useEffect(() => {
    if (mode === "edit" && recordId) {
      GetListingDetail();
    }
  }, [mode, recordId]);

  const GetListingDetail = async () => {
    try {
      const result = await db
        .select()
        .from(CarListing)
        .innerJoin(CarImages, eq(CarListing.id, CarImages.carListingId))
        .where(eq(CarListing.id, recordId));

      const resp = Service.FormatResult(result);
      setCarInfo(resp[0]);
      setFormData(resp[0]);
      setFeaturesData(resp[0].features);
    } catch (error) {
      console.error("Error fetching listing details:", error);
      toast.error("Failed to fetch listing details.");
    }
  };

  const handleInputChange = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFeatureChange = (name, value) => {
    setFeaturesData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    // Add your form validation logic here
    // Return true if the form is valid, otherwise false
    return true;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error("Please fill out all required fields correctly.");
      return;
    }

    setLoader(true);
    toast("Please Wait...");

    try {
      if (mode === "edit") {
        const result = await db
          .update(CarListing)
          .set({
            ...formData,
            features: featuresData,
            createdBy: user?.primaryEmailAddress?.emailAddress,
            userName: user?.fullName,
            userImageUrl: user?.imageUrl,
            postedOn: moment().format("DD/MM/yyyy"),
          })
          .where(eq(CarListing.id, recordId))
          .returning({ id: CarListing.id });
        console.log(result);
      } else {
        const result = await db
          .insert(CarListing)
          .values({
            ...formData,
            features: featuresData,
            createdBy: user?.primaryEmailAddress?.emailAddress,
            userName: user?.fullName,
            userImageUrl: user?.imageUrl,
            postedOn: moment().format("DD/MM/yyyy"),
          })
          .returning({ id: CarListing.id });
        if (result) {
          console.log("Data Saved");
          setTriggerUploadImages(result[0]?.id);
        }
      }
      setLoader(false);
      navigate("/profile");
    } catch (error) {
      console.error("Error saving listing:", error);
      toast.error("Failed to save listing.");
      setLoader(false);
    }
  };

  return (
    <div>
      <Header />
      <div className="px-10 md:px-20 my-10">
        <h2 className="font-bold text-4xl">Add New Listing</h2>
        <form className="p-10 border rounded-xl mt-10" onSubmit={onSubmit}>
          <div>
            <h2 className="font-medium text-xl mb-6">Car Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {carDetails.carDetails.map((item, index) => (
                <div key={index}>
                  <label className="text-sm flex gap-2 items-center mb-1">
                    <IconField icon={item?.icon} />
                    {item?.label}
                    {item.required && <span className="text-red-500">*</span>}
                  </label>
                  {item.fieldType === "text" || item.fieldType === "number" ? (
                    <InputField
                      item={item}
                      handleInputChange={handleInputChange}
                      carInfo={carInfo}
                    />
                  ) : item.fieldType === "dropdown" ? (
                    <DropdownField
                      item={item}
                      handleInputChange={handleInputChange}
                      carInfo={carInfo}
                    />
                  ) : item.fieldType === "textarea" ? (
                    <TextAreaField
                      item={item}
                      handleInputChange={handleInputChange}
                      carInfo={carInfo}
                    />
                  ) : null}
                </div>
              ))}
            </div>
          </div>
          <Separator className="my-6" />
          <div>
            <h2 className="font-medium text-xl my-6">Features</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {features.features.map((item, index) => (
                <div key={index} className="flex gap-2 items-center">
                  <Checkbox
                    className="bg-white"
                    onCheckedChange={(value) =>
                      handleFeatureChange(item.name, value)
                    }
                    checked={featuresData?.[item.name] || false}
                  />
                  <h2>{item.label}</h2>
                </div>
              ))}
            </div>
          </div>
          {/* Car Images */}
          <Separator className="my-6" />
          <UploadImages
            triggleUploadImages={triggerUploadImages}
            carInfo={carInfo}
            mode={mode}
            setLoader={(v) => {
              setLoader(v);
              navigate("/profile");
            }}
          />
          <div className="mt-10 flex justify-end">
            <Button type="submit" disabled={loader}>
              {!loader ? (
                "Submit"
              ) : (
                <BiLoaderAlt className="animate-spin text-lg" />
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddListing;
