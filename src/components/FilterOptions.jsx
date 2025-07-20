import { IconButton } from "@radix-ui/themes";
import { CiFilter } from "react-icons/ci";
import { Dialog} from "@radix-ui/themes";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import FilterBody from "./FilterBody";

const FilterOptions = () => {
  const [open, setOpen] = useState(false);
  console.log(open);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger>
        <IconButton
          color="gray"
          variant="outline"
          className="w-14 flex items-center justify-center rounded-full"
        >
          <CiFilter size={20} />
        </IconButton>
      </Dialog.Trigger>

      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-40 bg-black/40" />

        <AnimatePresence>
          {open && (
            <DialogPrimitive.Content asChild>
              <motion.div
                drag="y"
                dragConstraints={{ top: 0 }}
                dragElastic={0.2}
                onDragEnd={(e, info) => {
                  if (info.offset.y > 100) {
                    setOpen(false);
                  }
                }}
                initial={{ y: 500 }}
                animate={{ y: 0 }}
                exit={{ y: 500 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-2xl shadow-xl p-6 max-w-lg mx-auto"
              >
                <Dialog.Title className="hidden">Choose Filters</Dialog.Title>
                <Dialog.Description size="2" mb="4" className="hidden">
                  Enter your conditions and get relevant results.
                </Dialog.Description>

                {/* Filter Body Container */}
                <FilterBody />
              </motion.div>
            </DialogPrimitive.Content>
          )}
        </AnimatePresence>
      </DialogPrimitive.Portal>
    </Dialog.Root>
  );
};

export default FilterOptions;
