import { useRouter } from "next/router";
import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { useSession, signOut, getSession } from "next-auth/react";
import { Line } from "react-chartjs-2";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import {
  FiChevronDown,
  FiChevronUp,
  FiRepeat,
  FiClipboard,
  FiCheck,
  FiBell,
  FiImage,
  FiClock,
  FiLayers,
  FiXCircle,
} from "react-icons/fi";
import {
  Button,
  Tooltip,
  useClipboard,
  Avatar,
  Link,
  Switch,
  Flex,
  Box,
  Heading,
  Image,
  useDisclosure,
  Collapse,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Editable,
  EditableInput,
  EditablePreview,
  Center,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
} from "@chakra-ui/react";

// Compnent & File Imports
import API_URL from "../../../_helper/config";
import Auth from "../../../component/Auth";
import SideNav from "../../../component/SideNav";
import EditableInputComponent from "../../../component/EditableInputComponent";
import LinkPreview from "../../../component/LinkPreview";

const axios = require("axios");
const FormData = require("form-data");

// Types & Interface
type imgModelStateTypes = {
  imgModalState?: boolean;
  linkId?: string;
};
type imgDropZoneTypes = {
  file?: any;
};

const Links = function (props: any) {
  const { linksData } = props;
  const [imgFiles, setimgFiles] = React.useState<imgDropZoneTypes[]>([]);
  const { acceptedFiles, fileRejections, getRootProps, getInputProps } =
    useDropzone({
      accept: "image/jpeg, image/jpg, image/png",
      onDrop: () => {
        setimgFiles(
          acceptedFiles.map((file: any) =>
            Object.assign(file, {
              preview: URL.createObjectURL(file),
            })
          )
        );
      },
    });

  const fileRejectionItems = fileRejections.map(({ errors }) =>
    errors.map(() => <p style={{ color: "red" }}>Invalid File Type</p>)
  );

  const { data: session } = useSession();
  const router = useRouter();
  const { name } = router.query;
  // const {
  //   isOpen: isOpenFileUpload,
  //   onOpen: onOpenFileUpload,
  //   onClose: onCloseFileUpload,
  // }:{} = useDisclosure();

  //   if (loading) {
  //     console.log(setInterval(() => "Loading..", 1000));
  //   } else {
  //     console.log("Not Loading..");
  //   }

  // States & Effects
  const [analticsDropdown, setAnalticsDropdown] = useState("Weekly");
  const [linkList, setlinkList] = useState({ list: linksData.links });
  const [titleName, setTitleName] = useState("");
  const [urlName, setUrlName] = useState("");
  const [imgModal, setimgModal] = React.useState<imgModelStateTypes>({
    imgModalState: false,
    linkId: "",
  });

  const [crop, setCrop] = useState({ aspect: 1 / 1 });
  const [linkActiveState, setlinkActiveState] = useState(
    new Array(linksData.links.length)
      .fill(null)
      .map((_, i) => linksData.links[i].active === 1)
  );
  const { isOpen, onToggle } = useDisclosure();
  const { hasCopied, onCopy } = useClipboard(
    `https://www.linkwynk.com/${name}`
  );

  // Handle Image Upload Modal
  const openImgModal = (linkID: string) => {
    setimgModal({ imgModalState: true, linkId: linkID });
    // console.log(imgModal);
  };

  const closeImgModal = () => {
    acceptedFiles.length = 0;
    fileRejections.length = 0;
    acceptedFiles.splice(0, acceptedFiles.length);
    fileRejections.splice(0, fileRejections.length);
    // inputRef.current.value = '';
    setimgFiles([]);
    setimgModal({ imgModalState: false, linkId: "" });
  };

  // Link List Drag
  const onLinkDragEnd = (param: any) => {
    if (!param.destination) return;

    const linkItems = Array.from(linkList.list);
    const linksState = Array.from(linkActiveState);
    const [reorderedItem] = linkItems.splice(param.source.index, 1);
    const [linksStateItem] = linksState.splice(param.source.index, 1);
    linkItems.splice(param.destination.index, 0, reorderedItem);
    linksState.splice(param.destination.index, 0, linksStateItem);
    setlinkList({ list: linkItems });
    setlinkActiveState(linksState);

    const ids = linkItems.map((value: any) => value._id);

    axios
      .post(
        `${API_URL}sort_links`,
        {
          link_ids: ids,
        },
        {
          headers: {
            Authorization: `Bearer ${session?.userData.token}`,
          },
        }
      )
      .then(() => {})
      .catch(() => {});
  };

  // Add New Link
  const addLink = () => {
    const obj = {
      title: "Title",
      url: "Url",
      active: 0,
      link_image: null,
      username: session?.userData.username,
    };
    linkList.list.unshift(obj);
    linkActiveState.unshift(false);
    setlinkList({ list: linkList.list });
    setlinkActiveState(linkActiveState);
    axios
      .post(
        `${API_URL}save_link`,
        {
          title: obj.title,
          link_url: obj.url,
          acitve: obj.active,
          link_image: obj.link_image,
          username: obj.username,
        },
        {
          headers: {
            Authorization: `Bearer ${session?.userData.token}`,
          },
        }
      )
      .then((response: any) => {
        linkList.list[0]._id = response.data.link_id;
      })
      .catch(() => {});
    // linkList.list.unshift(obj);
    // setlinkList({list:linkList.list});
    // console.log(linkList);
  };

  // Remove Link
  const removeLink = (linkID: string, indexValue: number) => {
    const config = {
      headers: {
        Authorization: `Bearer ${session?.userData.token}`,
      },
      params: {
        linkID,
        username: session?.userData.username,
      },
    };

    const removedLinklist = linkList.list.filter(
      (item: any) => item._id !== linkID
    );
    const removedLinkState = linkActiveState.filter(
      (item, index) => index !== indexValue
    );
    setlinkList({ list: removedLinklist });
    setlinkActiveState(removedLinkState);

    axios
      .get(`${API_URL}delete_link`, config)
      .then(() => {})
      .catch(() => {});
  };

  // Handle Logout..
  const logOut = () => {
    axios
      .post(`${API_URL}logout`, null, {
        headers: {
          Authorization: `Bearer ${session?.userData.token}`,
        },
      })
      .then(() => {
        signOut({ redirect: true, callbackUrl: "/" });
        router.replace("/");
      })
      .catch(() => {});
  };

  const saveLinkData = (obj: any) => {
    const apiLoad = obj.switchCase;
    switch (apiLoad) {
      case "title":
        axios
          .post(
            `${API_URL}save_link`,
            { link_id: obj.linkId, title: obj.title },
            {
              headers: {
                Authorization: `Bearer ${session?.userData.token}`,
              },
            }
          )
          .then(() => {})
          .catch(() => {});

        break;
      case "url":
        axios
          .post(
            `${API_URL}save_link`,
            { link_id: obj.linkId, link_url: obj.url },
            {
              headers: {
                Authorization: `Bearer ${session?.userData.token}`,
              },
            }
          )
          .then(() => {})
          .catch(() => {});

        break;
      case "linkActiveState":
        axios
          .post(
            `${API_URL}save_link`,
            { link_id: obj.linkId, active: obj.active },
            {
              headers: {
                Authorization: `Bearer ${session?.userData.token}`,
              },
            }
          )
          .then(() => {})
          .catch(() => {});

        break;
      case "linkImg":
        {
          const imgData = new FormData();
          imgData.append("link_image", obj.img, obj.img.name);
          imgData.append("link_id", obj.linkId);
          imgData.append("username", session?.userData.username);
          const headers = {
            Authorization: `Bearer ${session?.userData.token}`,
            "Content-Type": `multipart/form-data`,
          };
          axios
            .post(`${API_URL}save_link`, imgData, { headers })
            .then((response: any) => {
              const updateImage = linkList.list.map((item: any) => {
                if (item._id === obj.linkId) {
                  return { ...item, photo: response.data.link_image };
                }
                return item;
              });

              setlinkList({ list: updateImage });
            })
            .catch(() => {});
        }
        break;
      default:
      // code block
    }
  };

  // Handle Link Title Value
  const saveTitleName = (linkTitleName: string, linkId: string) => {
    setTitleName(linkTitleName);
    const obj = { switchCase: "title", title: linkTitleName, linkId };
    saveLinkData(obj);
  };

  // Handle Link Url Value
  const saveUrlName = (linkUrlName: string, linkId: string) => {
    setUrlName(linkUrlName);
    const obj = { switchCase: "url", url: linkUrlName, linkId };
    saveLinkData(obj);
  };

  // Handle Link Image File
  const saveImgFile = () => {
    let imgFileData;
    imgFiles.map((file: any) => {
      imgFileData = file;
      return imgFileData;
    });
    const obj = {
      switchCase: "linkImg",
      img: imgFileData,
      linkId: imgModal.linkId,
      username: session?.userData.username,
    };

    saveLinkData(obj);
    acceptedFiles.length = 0;
    fileRejections.length = 0;
    acceptedFiles.splice(0, acceptedFiles.length);
    fileRejections.splice(0, fileRejections.length);
    setimgFiles([]);
    setimgModal({ imgModalState: false });
  };

  // Handle Link Active State
  const saveLinkActiveState = (state: any, toggleID: any, linkId: any) => {
    const active = state ? 1 : 0;
    const updatedCheckedState = linkActiveState.map((item, index) =>
      index === toggleID ? !item : item
    );
    setlinkActiveState(updatedCheckedState);
    const obj = {
      switchCase: "linkActiveState",
      active,
      linkId,
    };
    saveLinkData(obj);
  };

  return (
    <Box>
      {!linksData ? (
        <Auth />
      ) : (
        <Box className="clearfix">
          <SideNav />
          <Box
            width={{ base: "100%", md: "100%", lg: "calc(100% - 164px)" }}
            padding={{ base: "15px", md: "15px", lg: "24px 35px" }}
            position="relative"
            left={{ base: "0", md: "0", lg: "164px" }}
          >
            <Box className="links-dashboard" width="100%">
              <Flex className="row" justifyContent="space-between" width="100%">
                <Box
                  flexShrink="0"
                  flexBasis={{ base: "100%", md: "100%", lg: "70%" }}
                  h="100%"
                >
                  <Box
                    className="dashboard-greeting"
                    bg="#F5F5F7"
                    width="100%"
                    borderRadius="14px"
                    position="relative"
                    padding={{
                      base: "20px 0px",
                      md: "20px 0px",
                      lg: "46px 0px",
                    }}
                    marginTop={{ base: "15px", md: "15px", lg: "31px" }}
                  >
                    <Box
                      display="inline-block"
                      marginLeft={{ base: "18px", md: "18px", lg: "30px" }}
                    >
                      <Heading
                        fontSize={["22px", "32px", "36px", "36px"]}
                        isTruncated
                        maxWidth="300px"
                      >
                        Hello {name}!
                      </Heading>
                      <Text
                        fontSize={{ base: "14px", md: "16px", lg: "16px" }}
                        title="New Text"
                      >
                        It’s good to see you again.
                      </Text>
                    </Box>
                    <Box
                      position="absolute"
                      right={{ base: "20px", md: "20px", lg: "70px" }}
                      bottom="0"
                    >
                      <Image
                        src="/img/boy.svg"
                        alt="Greetings from linkwynk"
                        width={{ base: "100px", md: "auto", lg: "auto" }}
                      />
                    </Box>
                  </Box>
                  <Box className="links-analytics">
                    <Box
                      bg="#F5F5F7"
                      width="100%"
                      display="flex"
                      alignItems="center"
                      justifyContent="space-between"
                      borderRadius="14px"
                      marginTop="16px"
                      padding={{
                        base: "15px 18px",
                        md: "15px 18px",
                        lg: "16px 30px",
                      }}
                    >
                      <Box display="inline-block">
                        <Heading fontSize="16px">Lifetime Analytics:</Heading>
                        <Text
                          fontSize={["13px"]}
                          display="inline-block"
                          marginRight="16px"
                        >
                          Views: <b>0</b>
                        </Text>
                        <Text fontSize={["13px"]} display="inline-block">
                          Click: <b>0</b>
                        </Text>
                      </Box>
                      <Box display="inline-block">
                        <Button
                          className="theme-button"
                          width="120px"
                          fontSize="13px"
                          type="button"
                          display={{
                            base: "none",
                            md: "none",
                            lg: "inline-flex",
                          }}
                          onClick={onToggle}
                          rightIcon={
                            isOpen ? <FiChevronUp /> : <FiChevronDown />
                          }
                        >
                          View More
                        </Button>
                        <Button
                          className="theme-button"
                          width="auto"
                          fontSize="13px"
                          padding="0px"
                          display={{
                            base: "inline-flex",
                            md: "inline-flex",
                            lg: "none",
                          }}
                          type="button"
                          onClick={onToggle}
                        >
                          {isOpen ? <FiChevronUp /> : <FiChevronDown />}
                        </Button>
                      </Box>
                    </Box>
                    <Collapse in={isOpen} animateOpacity>
                      <Box mt="17px" className="analtics-tabs">
                        <Heading
                          fontSize={{ base: "18px", md: "18px", lg: "24px" }}
                          paddingLeft={{ base: "20px", md: "20px", lg: "30px" }}
                        >
                          Your Analytics:
                        </Heading>
                        <Tabs
                          variant="unstyled"
                          paddingLeft={{ base: "5px", md: "5px", lg: "14px" }}
                          id="tabs"
                          isLazy
                        >
                          <TabList>
                            <Tab
                              _selected={{
                                color: "#0C0B0B",
                                bg: "transparent",
                                opacity: "1",
                              }}
                              fontSize={{
                                base: "14px",
                                md: "14px",
                                lg: "16px",
                              }}
                            >
                              Views
                            </Tab>
                            <Tab
                              _selected={{
                                color: "#0C0B0B",
                                bg: "transparent",
                                opacity: "1",
                              }}
                              fontSize={{
                                base: "14px",
                                md: "14px",
                                lg: "16px",
                              }}
                            >
                              Clicks
                            </Tab>
                            <Box marginLeft="auto">
                              <Menu id="menu" placement="bottom-end">
                                {({ isOpen }) => (
                                  <Box>
                                    <MenuButton
                                      isActive={isOpen}
                                      as={Button}
                                      rightIcon={<FiChevronDown />}
                                      bg="#F5F5F7"
                                      fontSize="13px"
                                      _focus={{ boxShadow: "none" }}
                                    >
                                      {analticsDropdown}
                                    </MenuButton>
                                    <MenuList id="menu-list" minWidth="120px">
                                      <MenuItem
                                        _focus={{
                                          background: "#0C0B0B",
                                          color: "#FFFFFF",
                                        }}
                                        onClick={() =>
                                          setAnalticsDropdown("Weekly")
                                        }
                                      >
                                        Weekly
                                      </MenuItem>
                                      <MenuItem
                                        _focus={{
                                          background: "#0C0B0B",
                                          color: "#FFFFFF",
                                        }}
                                        onClick={() =>
                                          setAnalticsDropdown("Monthly")
                                        }
                                      >
                                        Monthly
                                      </MenuItem>
                                      <MenuItem
                                        _focus={{
                                          background: "#0C0B0B",
                                          color: "#FFFFFF",
                                        }}
                                        onClick={() =>
                                          setAnalticsDropdown("Yearly")
                                        }
                                      >
                                        Yearly
                                      </MenuItem>
                                    </MenuList>
                                  </Box>
                                )}
                              </Menu>
                            </Box>
                          </TabList>
                          <TabPanels>
                            <TabPanel>
                              <Line
                                data={{
                                  labels: [
                                    "Sun",
                                    "Mon",
                                    "Tue",
                                    "Wed",
                                    "Thur",
                                    "Fri",
                                    "Sat",
                                  ],
                                  datasets: [
                                    {
                                      label: "Total",
                                      data: [12, 19, 3, 5, 2, 3, 10],
                                      borderColor: "#0C0B0B",
                                      borderWidth: 2,
                                      tension: 0.3,
                                      pointBackgroundColor: "#0C0B0B",
                                      pointBorderWidth: 5,
                                      pointHoverBorderWidth: 5,
                                    },
                                  ],
                                }}
                                height={100}
                                options={{
                                  responsive: true,
                                  maintainAspectRatio: true,
                                  plugins: {
                                    tooltip: {
                                      callbacks: {
                                        labelTextColor() {
                                          return "#FFFFFF";
                                        },
                                      },
                                      backgroundColor: "#0C0B0B",
                                      bodyColor: "#FFFFFF",
                                      bodyFont: {
                                        size: 16,
                                      },
                                      bodySpacing: 2,
                                    },
                                    legend: {
                                      display: false,
                                    },
                                  },
                                  scales: {
                                    y: {
                                      grid: {
                                        gridLines: {
                                          display: false,
                                          color: "#F5F5F7",
                                        },
                                        ticks: {
                                          beginAtZero: true,
                                        },
                                      },
                                    },
                                  },
                                }}
                                type={undefined}
                              />
                            </TabPanel>
                            <TabPanel>
                              <p>two!</p>
                            </TabPanel>
                          </TabPanels>
                        </Tabs>
                      </Box>
                    </Collapse>
                  </Box>
                  <Box className="add-links-section">
                    <Center
                      marginTop={{ base: "20px", md: "20px", lg: "40px" }}
                    >
                      <Button
                        onClick={addLink}
                        className="theme-button"
                        width={{ base: "100px", md: "100px", lg: "130px" }}
                        padding="18px 40px"
                        type="button"
                      >
                        Add Links
                      </Button>
                    </Center>

                    {/* Start of Links Drag and Drop Section */}

                    <Box
                      className="draggable-container"
                      marginTop={{ base: "20px", md: "20px", lg: "40px" }}
                    >
                      <DragDropContext onDragEnd={onLinkDragEnd}>
                        <Droppable droppableId="droppable-1">
                          {(provided) => (
                            <Box
                              ref={provided.innerRef}
                              {...provided.droppableProps}
                            >
                              {Object.values(linkList.list).map(
                                (type: any, i) => (
                                  <Draggable
                                    key={type._id}
                                    draggableId={`draggable-${type._id}`}
                                    index={i}
                                  >
                                    {(provided, snapshot) => (
                                      <Box
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                      >
                                        <Box
                                          className="links"
                                          bg="#F5F5F7"
                                          borderRadius="14px"
                                          style={{
                                            ...provided.draggableProps,
                                            boxShadow: snapshot.isDragging
                                              ? "0 0 .4rem #666"
                                              : "none",
                                          }}
                                        >
                                          <Flex>
                                            <Box
                                              {...provided.dragHandleProps}
                                              className="draggable-handle"
                                              display="flex"
                                              padding={{
                                                base: "0px 13px",
                                                md: "0px 13px",
                                                lg: "0px 16px",
                                              }}
                                              borderRight="2px solid rgba(12, 11, 11, 0.2)"
                                            >
                                              <Center transform="rotate(90deg)">
                                                <FiRepeat fontSize="20px" />
                                              </Center>
                                            </Box>
                                            <Box
                                              className="draggable-link-content"
                                              padding="8px 16px"
                                              width="100%"
                                            >
                                              <Flex
                                                alignItems="center"
                                                className="edit-link-details"
                                              >
                                                <Box
                                                  className="link-img"
                                                  display="inline-block"
                                                >
                                                  <Image
                                                    boxSize="64px"
                                                    borderRadius="12px"
                                                    objectFit="cover"
                                                    src={
                                                      type.photo
                                                        ? `https://dev.welovecoders.com/storage/app/public/${type.photo}`
                                                        : ""
                                                    }
                                                    alt={type.title}
                                                    fallbackSrc={
                                                      !type.photo
                                                        ? "https://via.placeholder.com/64"
                                                        : ""
                                                    }
                                                  />
                                                </Box>
                                                <Box
                                                  className="link-detials"
                                                  display="inline-block"
                                                  marginLeft={{
                                                    base: "10px",
                                                    md: "10px",
                                                    lg: "22px",
                                                  }}
                                                >
                                                  <Editable
                                                    defaultValue={type.title}
                                                    isPreviewFocusable={false}
                                                    className="editable-container"
                                                  >
                                                    <EditablePreview
                                                      className="themeFont"
                                                      fontSize={{
                                                        base: "14px",
                                                        md: "14px",
                                                        lg: "16px",
                                                      }}
                                                    />
                                                    <EditableInput
                                                      value={titleName}
                                                      onKeyDown={(e) => {
                                                        if (e.key === "Enter") {
                                                          saveTitleName(
                                                            e.currentTarget
                                                              .value,
                                                            type._id
                                                          );
                                                        }
                                                      }}
                                                      onBlur={(e) => {
                                                        saveTitleName(
                                                          e.currentTarget.value,
                                                          type._id
                                                        );
                                                      }}
                                                    />
                                                    <EditableInputComponent />
                                                  </Editable>
                                                  <Editable
                                                    defaultValue={
                                                      type.link_url
                                                        ? type.link_url
                                                        : urlName
                                                    }
                                                    isPreviewFocusable={false}
                                                    className="editable-container"
                                                  >
                                                    <EditablePreview
                                                      fontSize={{
                                                        base: "14px",
                                                        md: "14px",
                                                        lg: "16px",
                                                      }}
                                                    />
                                                    <EditableInput
                                                      value={urlName}
                                                      onKeyDown={(e) => {
                                                        if (e.key === "Enter") {
                                                          saveUrlName(
                                                            e.currentTarget
                                                              .value,
                                                            type._id
                                                          );
                                                        }
                                                      }}
                                                      onBlur={(e) => {
                                                        saveUrlName(
                                                          e.currentTarget.value,
                                                          type._id
                                                        );
                                                      }}
                                                    />
                                                    <EditableInputComponent />
                                                  </Editable>
                                                </Box>
                                                <Box marginLeft="auto">
                                                  <Box className="toggle-link">
                                                    <Switch
                                                      id="link-show-hide"
                                                      size="md"
                                                      isChecked={
                                                        linkActiveState[i]
                                                      }
                                                      onChange={(e) => {
                                                        saveLinkActiveState(
                                                          e.target.checked,
                                                          i,
                                                          type._id
                                                        );
                                                      }}
                                                    />
                                                  </Box>
                                                </Box>
                                              </Flex>
                                              <Flex
                                                className="icon-links-control"
                                                marginTop="5px"
                                                justifyContent="flex-end"
                                              >
                                                <Box>
                                                  {/* <Box display="inline-block" cursor="pointer" marginRight="18px" fontSize="18px">
                              <FiShuffle title="link Name"  />
                            </Box> */}
                                                  <Tooltip
                                                    hasArrow
                                                    label="Image"
                                                    bg="#0C0B0B"
                                                    color="#FFFFFF"
                                                    borderRadius="8px"
                                                  >
                                                    <Box
                                                      display="inline-block"
                                                      onClick={() =>
                                                        openImgModal(type._id)
                                                      }
                                                      cursor="pointer"
                                                      marginRight="18px"
                                                      fontSize="18px"
                                                    >
                                                      <FiImage title="link Thumbnail" />
                                                    </Box>
                                                  </Tooltip>
                                                  {/* <Box display="inline-block" cursor="pointer" marginRight="18px" fontSize="18px">
                              <FiZap title="link Thumbnail" />
                            </Box> */}
                                                  <Tooltip
                                                    hasArrow
                                                    label="Schedule"
                                                    bg="#0C0B0B"
                                                    color="#FFFFFF"
                                                    borderRadius="8px"
                                                  >
                                                    <Box
                                                      display="inline-block"
                                                      cursor="pointer"
                                                      marginRight="18px"
                                                      fontSize="18px"
                                                    >
                                                      <FiClock title="link Schedule" />
                                                    </Box>
                                                  </Tooltip>
                                                  <Box
                                                    display="inline-block"
                                                    cursor="pointer"
                                                    marginRight="18px"
                                                    fontSize="18px"
                                                  >
                                                    <FiLayers />
                                                  </Box>
                                                  <Tooltip
                                                    hasArrow
                                                    label="Delete"
                                                    bg="#0C0B0B"
                                                    color="#FFFFFF"
                                                    borderRadius="8px"
                                                  >
                                                    <Box
                                                      display="inline-block"
                                                      fontSize="18px"
                                                      color="red"
                                                      cursor="pointer"
                                                      onClick={() =>
                                                        removeLink(type._id, i)
                                                      }
                                                    >
                                                      <FiXCircle title="Remove Link" />
                                                    </Box>
                                                  </Tooltip>
                                                </Box>
                                              </Flex>
                                            </Box>
                                          </Flex>
                                        </Box>
                                      </Box>
                                    )}
                                  </Draggable>
                                )
                              )}
                              {provided.placeholder}
                            </Box>
                          )}
                        </Droppable>
                      </DragDropContext>
                    </Box>

                    {/* End of Links Drag and Drop Section */}
                  </Box>
                </Box>
                <Box
                  h="100%"
                  display={{ base: "none", md: "none", lg: "block" }}
                >
                  <Box className="link-preview-container" marginTop="31px">
                    <Box
                      className="notification-profile-dropdown"
                      display="flex"
                      alignItems="center"
                      justifyContent="flex-end"
                    >
                      <Box
                        className="notification-bell"
                        display="inline-block"
                        boxSize="25px"
                        marginRight="20px"
                      >
                        <FiBell fontSize="25px" />
                      </Box>

                      <Box className="profile-dropdown" display="inline-block">
                        <Menu>
                          <MenuButton>
                            <Avatar
                              name="User Image"
                              boxSize="40px"
                              borderRadius="8px"
                              src="https://bit.ly/dan-abramov"
                            />
                            <Box
                              display="inline-block"
                              marginTop="25%"
                              marginLeft="5px"
                            >
                              <FiChevronDown />
                            </Box>
                          </MenuButton>
                          <MenuList minWidth="120px">
                            <MenuItem
                              _focus={{
                                background: "#0C0B0B",
                                color: "#FFFFFF",
                              }}
                            >
                              Profile
                            </MenuItem>
                            <MenuItem
                              _focus={{
                                background: "#0C0B0B",
                                color: "#FFFFFF",
                              }}
                            >
                              Setting
                            </MenuItem>
                            <MenuItem
                              _focus={{
                                background: "#0C0B0B",
                                color: "#FFFFFF",
                              }}
                              onClick={logOut}
                            >
                              Logout
                            </MenuItem>
                          </MenuList>
                        </Menu>
                      </Box>
                    </Box>
                    <Box>
                      <LinkPreview />
                    </Box>
                    <Box
                      className="user-linkwynk-link"
                      marginTop="30px"
                      justifyContent="center"
                      display="flex"
                      alignItems="center"
                    >
                      <Text
                        display="inline-block"
                        fontWeight="700"
                        fontSize={["14px", "16px", "18px", "20px"]}
                        marginRight="5px"
                      >
                        My Linkwynk:
                      </Text>
                      <Link
                        fontSize={["14px", "16px", "18px", "20px"]}
                        href={`https://www.linkwynk.com/${name}`}
                        isExternal
                      >
                        linkwynk.com/{name}
                      </Link>
                      <Box
                        display="inline-block"
                        marginLeft="5px"
                        cursor="pointer"
                        title="Copy"
                        onClick={onCopy}
                      >
                        {!hasCopied ? (
                          <FiClipboard fontSize="20px" />
                        ) : (
                          <FiCheck fontSize="22px" />
                        )}
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Flex>
            </Box>
          </Box>
          <Modal
            size="xl"
            isOpen={imgModal.imgModalState!}
            onClose={closeImgModal}
            isCentered
          >
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Upload Image</ModalHeader>
              <ModalBody>
                <section className="linkImg-upload-container">
                  {/* {linkList.list.filter((data) => {
          if(data._id == imgModal.linkId){
            if(data.photo){
              console.log(data.photo);
              <img src={"https://dev.welovecoders.com/storage/app/public/"+data.photo }/>
            }
          }
        })} */}
                  {imgFiles.length === 0 ? (
                    <div {...getRootProps({ className: "dropzone" })}>
                      <input {...getInputProps()} />
                      <p>
                        Drag &apos;n&apos; drop some files here, or click to
                        select files
                      </p>
                      <em>(Only *.jpeg and *.png images will be accepted)</em>
                    </div>
                  ) : (
                    <aside>
                      {imgFiles.map((file: any) => (
                        <ReactCrop
                          src={file.preview}
                          crop={crop}
                          onChange={(newCrop: any) => setCrop(newCrop)}
                        />
                      ))}
                    </aside>
                  )}
                  {fileRejectionItems}
                </section>
              </ModalBody>

              <ModalFooter>
                <Button className="theme-button" mr={3} onClick={closeImgModal}>
                  Close
                </Button>
                <Button className="theme-button" onClick={saveImgFile}>
                  Save
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </Box>
      )}
    </Box>
  );
};

export async function getServerSideProps(context: any) {
  const sessionData = await getSession(context);

  if (sessionData) {
    axios.defaults.headers.common.Authorization = `Bearer ${sessionData.userData.token}`;
    const { data } = await axios.get(`${API_URL}list_links`, {
      params: {
        username: sessionData.userData.username,
      },
    });
    return {
      props: { linksData: data },
    };
  }
  return {
    props: { linksData: null },
  };
}

export default Links;
