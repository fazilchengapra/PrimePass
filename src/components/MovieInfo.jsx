import {Button, Dialog, Tabs} from "@radix-ui/themes";
import { IoMdClose } from "react-icons/io";
import TabsContent from "./TabsContent";

const MovieInfo = ({ movieId, movieDetails }) => {

  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button radius="large" color="gray" variant="outline" highContrast>
          View Details
        </Button>
      </Dialog.Trigger>

      <Dialog.Content className="max-w-1/2 max-h-[80vh] overflow-hidden p-0">
        <Tabs.Root defaultValue="video">
          {/* Sticky Header */}
          <div className="sticky top-0 z-10 bg-white px-6 pt-6 pb-3">
            <Dialog.Title>Movie Details</Dialog.Title>
            <Dialog.Description size="1">
              {movieDetails?.title}
            </Dialog.Description>
            <Dialog.Close className="absolute top-6 right-10">
              <div className="p-2 rounded-full bg-gray-200">
                <IoMdClose size={18} className="text-black cursor-pointer" />
              </div>
            </Dialog.Close>

            {/* Tabs must be inside Tabs.Root */}
            <Tabs.List className="mt-4">
              <Tabs.Trigger value="video">Videos</Tabs.Trigger>
              <Tabs.Trigger value="cast">Cast</Tabs.Trigger>
              <Tabs.Trigger value="topic">Topic</Tabs.Trigger>
            </Tabs.List>
          </div>

          {/* Scrollable Content */}
          <TabsContent movieId={movieId} movieDetails={movieDetails}/>
        </Tabs.Root>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default MovieInfo;
