import { Flex, Skeleton, Text } from "@radix-ui/themes";

const MovieCardSkelton = () => {
  return (
    <div>
      <div className="hidden lg:block">
        <div className="flex flex-col gap-2 mb-4">
          <Skeleton className="rounded-2xl" width="12rem" height="270px" />
          <Skeleton className="rounded-md" width="8rem" height="15px" />
          <div className="flex flex-col gap-1">
            <Skeleton className="rounded-md" width="11rem" height="12px" />
            <Skeleton className="rounded-md" width="11rem" height="12px" />
          </div>
        </div>
      </div>

      <div className="block lg:hidden mb-4">
        <Flex direction="column" gap="1">
          <Skeleton className="rounded-2xl" width="8rem" height="150px" />
          <Text>
            <Skeleton>Lorem ipsum</Skeleton>
          </Text>
        </Flex>
      </div>
    </div>
  );
};

export default MovieCardSkelton;
