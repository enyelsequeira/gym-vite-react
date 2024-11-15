import { useGSAP } from "@gsap/react";
import { Box, Button, Flex, Grid, Image, Stack, Text } from "@mantine/core";
import gsap from "gsap";
import { useCallback, useRef, useState } from "react";
import { BsArrowRight } from "react-icons/bs";
import classes from "./features.module.css";

interface Feature {
  title: string;
  description: string;
}

interface FeatureItemProps extends Feature {
  isActive: boolean;
  onClick: () => void;
}

const FeatureItem = ({
  title,
  description,
  isActive,
  onClick,
}: FeatureItemProps) => {
  return (
    <Box
      className={`${classes.featureItem} ${isActive ? classes.active : ""}`}
      onClick={onClick}
    >
      <Box className={classes.content}>
        <Text className={classes.title}>{title}</Text>
        <Text className={classes.description}>{description}</Text>
        <Button
          variant="subtle"
          rightSection={<BsArrowRight size={14} />}
          className={classes.button}
        >
          Learn more
        </Button>
      </Box>
    </Box>
  );
};

interface FeatureListProps {
  setActiveIndex: (index: number) => void;
}

const FeatureList = ({ setActiveIndex }: FeatureListProps) => {
  const [activeIndex, setActiveIndexLocal] = useState(0);
  const dotRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const features: Feature[] = [
    {
      title: "Share team inboxes",
      description:
        "Whether you have a team of 2 or 200, our shared team inboxes keep everyone on the same page and in the loop.",
    },
    {
      title: "Deliver instant answers",
      description:
        "An all-in-one customer service platform that helps you balance everything your customers need to be happy.",
    },
    {
      title: "Manage your team with reports",
      description:
        "Measure what matters with Untitled's easy-to-use reports. You can filter, export, and drilldown on the data in a couple clicks.",
    },
  ];

  useGSAP(() => {
    if (dotRef.current && listRef.current) {
      const items = listRef.current.children;
      const itemHeight = items[0].getBoundingClientRect().height;
      gsap.to(dotRef.current, {
        top: `${activeIndex * itemHeight + 24}px`, // Adjust 24px based on your spacing
        duration: 0.3,
        ease: "power2.inOut",
        backgroundColor: "var(--mantine-color-blue-6)",
      });
    }
  }, [activeIndex]);

  const handleClick = (index: number) => {
    setActiveIndexLocal(index);
    setActiveIndex(index);
  };

  return (
    <Box className={classes.featureList}>
      <div className={classes.stepperLine}>
        <div ref={dotRef} className={classes.dot} />
      </div>
      <Stack ref={listRef} gap={0}>
        {features.map((feature, index) => (
          <FeatureItem
            key={`${feature.title}-${index}`}
            title={feature.title}
            description={feature.description}
            isActive={index === activeIndex}
            onClick={() => handleClick(index)}
          />
        ))}
      </Stack>
    </Box>
  );
};

const Features = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(0);
  const imageRefs = useRef<(HTMLImageElement | null)[]>([]);

  const images = [
    "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1647456753452-e5d7cbf16df1?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  ];

  const setImageRef = useCallback(
    (el: HTMLImageElement | null, index: number) => {
      imageRefs.current[index] = el;
    },
    []
  );

  useGSAP(
    () => {
      if (activeIndex !== prevIndex) {
        const tl = gsap.timeline();
        tl.to(imageRefs.current[prevIndex], {
          opacity: 0,
          rotationY: 90,
          duration: 0.4,
          ease: "power2.in",
        })
          .set(imageRefs.current[prevIndex], { display: "none" })
          .set(imageRefs.current[activeIndex], {
            display: "block",
            opacity: 0,
            rotationY: -90,
          })
          .to(imageRefs.current[activeIndex], {
            opacity: 1,
            rotationY: 0,
            duration: 0.4,
            ease: "power2.out",
          });

        setPrevIndex(activeIndex);
      }
    },
    { dependencies: [activeIndex] }
  );

  const handleSetActiveIndex = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <Box px={{ base: "sm", lg: 80 }} my={100} component={"section"}>
      <Flex direction={"column"} maw={700} mb={77}>
        <Text c={"#0B4A6F"} fz={"md"} fw={600}>
          Key Features
        </Text>
        <Text mt={12} mb={20} c={"#101828"} fw={600} fz={36}>
          Overflowing with useful features
        </Text>
        <Text fz={20} c={"#475467"}>
          Powerful, self-serve product and growth analytics to help you convert,
          engage, and retain more users. Trusted by over 4,000 startups.
        </Text>
      </Flex>
      <Grid gutter="md">
        <Grid.Col span={{ base: 12, lg: 6 }}>
          <FeatureList setActiveIndex={handleSetActiveIndex} />
        </Grid.Col>
        <Grid.Col
          span={{ base: 12, lg: 6 }}
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Box
            w="100%"
            h={400}
            style={{ position: "relative", overflow: "hidden" }}
          >
            {images.map((src, index) => (
              <Image
                radius={"sm"}
                key={`${src}+${index + 1}`}
                ref={(el) => setImageRef(el, index)}
                src={src}
                alt={`Feature ${index + 1}`}
                height={400}
                fit="cover"
                style={{
                  position: "absolute",
                  backgroundSize: "cover",
                  top: 0,
                  left: 0,
                  display: index === 0 ? "block" : "none",
                  opacity: index === 0 ? 1 : 0,
                }}
              />
            ))}
          </Box>
        </Grid.Col>
      </Grid>
    </Box>
  );
};

export default Features;
