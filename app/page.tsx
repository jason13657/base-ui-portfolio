import ButtonSample from "@/lib/component/samples/ButtonSample";
import InputSample from "@/lib/component/samples/InputSample";
import ModalSample from "@/lib/component/samples/ModalSample";
import NavSample from "@/lib/component/samples/NavgationSample";
import SelectSample from "@/lib/component/samples/SelectSample";
import TabsSample from "@/lib/component/samples/TabSample";
import ToastSample from "@/lib/component/samples/ToastSample";
import TooltipSample from "@/lib/component/samples/TooltipSample";

export default function Home() {
  return (
    <div className="max-w-5xl mx-auto my-10 space-y-15 py-10">
      <ButtonSample />
      <InputSample />
      <SelectSample />
      <ModalSample />
      <TabsSample />
      <TooltipSample />
      <NavSample />
      <ToastSample />
    </div>
  );
}
