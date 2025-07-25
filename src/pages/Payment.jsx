import { AlertDialog, Button, Flex, Separator } from "@radix-ui/themes";
import { FaCircleArrowRight } from "react-icons/fa6";
import PaymentMethods from "../components/PaymentMethods";
import { IoIosClose } from "react-icons/io";
import { useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";

const Payment = () => {
  const [searchParams] = useSearchParams();
  const time = searchParams.get("time");
  const count = searchParams.get("count")
  const movie = useSelector((state) => state.movie.selectedMovie);
  const theater = useSelector((state) => state?.theater?.theater);
  
  return (
    <div className="w-full h-full pt-20">
      <div className="bg-white m-auto w-[90%] lg:w-1/3 h-fit rounded-lg">
        <div className="p-5">
          <div className="flex flex-row gap-3 items-center">
            <div className="w-2/12 h-fit">
              <img
                alt="poster"
                className="w-full h-auto object-cover rounded-md"
                src={'https://image.tmdb.org/t/p/w185/'+movie?.poster_path}
              />
            </div>
            <div className="flex flex-col gap-3">
              <div className="text-lg font-bold lg:font-semibold">
                <h3>{movie?.title}</h3>
              </div>
              <div className="text-sm font-semibold">
                <h5>{theater?.theater}</h5>
              </div>
            </div>
          </div>
          <Separator my="3" size="4" />
          <div className="flex flex-col gap-2 font-semibold lg:font-medium text-sm">
            <div>
              <span>Number of Seats <span className="font-bold ml-2">{count}</span></span>
            </div>
            <div>
              <span>Child: 0</span>
            </div>
            <div className="flex flex-row justify-between">
              <span>Show Date: 2 jan 2025 </span>{" "}
              <span>Show Time: <span className="ml-2 font-bold">{time}</span> </span>
            </div>
          </div>

          <div className="mt-6">
            <div className="text-lg font-bold lg:font-semibold">
              <h3>Payment Details</h3>
            </div>
            <div className="mt-5 flex flex-col gap-4 font-semibold lg:font-normal">
              <div className="flex flex-row justify-between">
                <span>Ticket Price:</span>
                <span>₹110</span>
              </div>
              <div className="flex flex-row justify-between">
                <span>Tax in Ticket:</span>
                <span>18%</span>
              </div>
            </div>
            <div className="flex flex-row justify-between font-bold lg:font-semibold mt-3">
              <span>Total:</span>
              <span>{(110 * count * 1.18).toFixed(2)}</span>
            </div>

            <div className="mt-4 flex justify-end">
              <AlertDialog.Root>
                <AlertDialog.Trigger>
                  <Button variant="solid" className="py-5">
                    Proceed to Pay <FaCircleArrowRight />
                  </Button>
                </AlertDialog.Trigger>
                <AlertDialog.Content maxWidth="450px">
                  <Flex justify="between" className="items-center">
                    <AlertDialog.Title className="text-sm mt-5">
                      Select Payment Method
                    </AlertDialog.Title>
                    <AlertDialog.Cancel className="cursor-pointer">
                      <div className="p-2 bg-gray-100 rounded-full">
                        <IoIosClose size="25" />
                      </div>
                    </AlertDialog.Cancel>
                  </Flex>

                  <AlertDialog.Description size="2" className="hidden">
                    Chose your payment Method
                  </AlertDialog.Description>

                  {/* payment methods */}
                  <PaymentMethods />
                </AlertDialog.Content>
              </AlertDialog.Root>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
