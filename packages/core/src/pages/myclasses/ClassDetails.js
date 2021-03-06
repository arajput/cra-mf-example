import { Collapsible, IconByName, Layout, Menu } from "@shiksha/common-lib";
import {
  HStack,
  Text,
  VStack,
  Button,
  Stack,
  Box,
  FlatList,
  PresenceTransition,
  Pressable,
  StatusBar,
  Center,
  Progress,
  Avatar,
  Icon,
  Actionsheet,
} from "native-base";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useParams } from "react-router-dom";
import * as classServiceRegistry from "../../services/classServiceRegistry";
import * as studentServiceRegistry from "../../services/studentServiceRegistry";

export default function ClassDetails() {
  const { t } = useTranslation();
  const [students, setStudents] = useState([]);
  const [classObject, setClassObject] = useState({});
  const { classId } = useParams();
  const fullName = sessionStorage.getItem("fullName");

  useEffect(() => {
    let ignore = false;
    const getData = async () => {
      setStudents(
        await studentServiceRegistry.getAll({
          filters: {
            currentClassID: {
              eq: classId,
            },
          },
        })
      );

      let classObj = await classServiceRegistry.getOne({ id: classId });
      if (!ignore) setClassObject(classObj);
    };
    getData();
  }, [classId]);

  return (
    <Layout
      imageUrl={window.location.origin + "/class.png"}
      _header={{
        title: t("MY_CLASSES"),
        fullRightComponent: (
          <Box minH={"150px"}>
            <Box
              position={"absolute"}
              style={{ backgroundColor: "rgba(24, 24, 27, 0.4)" }}
              bottom={0}
              p={5}
              width={"100%"}
            >
              <VStack>
                <Text color="gray.100" fontWeight="700" fontSize="md">
                  {classObject.className}
                </Text>

                <Text color="gray.100" fontWeight="700" fontSize="2xl">
                  {t("CLASS_DETAILS")}
                </Text>
              </VStack>
            </Box>
          </Box>
        ),
      }}
      _appBar={{ languages: ["en"] }}
      subHeader={
        <Menu
          routeDynamics={true}
          items={[
            {
              id: classId,
              keyId: 1,
              title: t("TAKE_ATTENDANCE"),
              icon: "CalendarCheckLineIcon",
              route: "/attendance/:id",
              boxMinW: "200px",
            },
          ]}
          type={"veritical"}
        />
      }
      _subHeader={{
        bottom: "15px",
        bg: "classCard.500",
      }}
      _footer={{
        menues: [
          {
            title: "HOME",
            icon: "Home4LineIcon",
            module: "Registry",
            route: "/",
            routeparameters: {},
          },
          {
            title: "CLASSES",
            icon: "TeamLineIcon",
            module: "Registry",
            route: "/classes",
            routeparameters: {},
          },
          {
            title: "SCHOOL",
            icon: "GovernmentLineIcon",
            module: "Registry",
            route: "/",
            routeparameters: {},
          },
          {
            title: "MATERIALS",
            icon: "BookOpenLineIcon",
            module: "Registry",
            route: "/",
            routeparameters: {},
          },
          {
            title: "CAREER",
            icon: "UserLineIcon",
            module: "Registry",
            route: "/",
            routeparameters: {},
          },
        ],
      }}
    >
      <Stack space={1} mb="2" shadow={2}>
            <ClassAttendanceCard classId={classObject.id}></ClassAttendanceCard>
            <ClassStudentsPanel
              classObject={classObject}
              students={students}
            ></ClassStudentsPanel>
            <ClassSubjectsPanel></ClassSubjectsPanel>
            <ClassDetailsPanel></ClassDetailsPanel>
      </Stack>
    </Layout>
  );
}

/**
 * Class Attendance Summary Card
 */
function ClassAttendanceCard(classId, ...otherProps) {
  const { t } = useTranslation();

  return (
    <Collapsible defaultCollapse={true} header={t("CLASS_ATTENDANCE")}>
      <VStack p="2" space={4}>
        <Box bg={"gray.100"} rounded={"md"} p="4">
          <VStack space={2}>
            <HStack justifyContent={"space-between"} alignItems="center">
              <Text bold>{t("STATUS")}</Text>
              <IconByName name="More2LineIcon" />
            </HStack>
            <Progress
              value={17}
              max={24}
              my="4"
              size={"2xl"}
              colorScheme="green"
              bg="button.400"
            >
              <Text color="white">17 {t("PRESENT")}</Text>
            </Progress>
            <HStack justifyContent={"space-between"} alignItems="center">
              {/* <Text>{t("GRADE") + ": " + t("GOOD")}</Text> */}
              <Text>{t("TOTAL") + ": 24 " + t("STUDENTS")}</Text>
            </HStack>
          </VStack>
        </Box>
        <Link
          style={{
            color: "rgb(63, 63, 70)",
            textDecoration: "none",
          }}
          to={"/attendance/" + classId}
        >
          <Box
            rounded="xs"
            borderWidth="1"
            px={6}
            py={2}
            mt="2"
            textAlign={"center"}
            borderColor={"button.500"}
            _text={{ color: "button.500" }}
          >
            {t("ATTENDANCE_REGISTER")}
          </Box>
        </Link>

        <Box
          bg="white"
          p={4}
          borderBottomWidth="1"
          borderBottomColor={"coolGray.200"}
        >
          <Stack space={2}>
            <Collapsible header={t("REPORTS")} />
          </Stack>
        </Box>

        <Box
          bg="white"
          p={4}
          borderBottomWidth="1"
          borderBottomColor={"coolGray.200"}
        >
          <Stack space={2}>
            <Collapsible header={t("SMS_REPORTS")} />
          </Stack>
        </Box>
      </VStack>
    </Collapsible>
  );
}

/**
 * Class Students Panel
 */
function ClassStudentsPanel(classObject, students, ...otherProps) {
  const { t } = useTranslation();
  return (
    <Collapsible defaultCollapse={true} header={t("STUDENTS")}>
      <VStack space={2} pt="2">
        <Box>
          <FlatList
            data={students}
            renderItem={({ item }) => (
              <Box
                borderBottomWidth="1"
                _dark={{
                  borderColor: "gray.600",
                }}
                borderColor="coolGray.200"
                pr="1"
                py="4"
              >
                <Card item={item} href={"/students/" + item.id} />
              </Box>
            )}
            keyExtractor={(item) => item.id}
          />
        </Box>
        <Link
          style={{
            textDecoration: "none",
          }}
          to={"/class/students/" + classObject?.id?.replace("1-", "")}
        >
          <Button mt="2" variant="outline" colorScheme="button">
            {t("SHOW_ALL_STUDENTS")}
          </Button>
        </Link>
      </VStack>
    </Collapsible>
  );
}

const SubCard = ({
  item,
  type,
  img,
  textTitle,
  textSubTitle,
  _textTitle,
  _textSubTitle,
}) => {
  const { t } = useTranslation();
  return type === "veritical" ? (
    <VStack alignItems={"center"}>
      {typeof img === "undefined" || img === true ? (
        <Avatar
          size="40px"
          bg={item?.avatarUrl ? "" : "amber.500"}
          {...(item?.avatarUrl ? { source: { uri: item.avatarUrl } } : {})}
          rounded="lg"
        >
          {item?.avatarUrl ? "" : item?.fullName?.toUpperCase().substr(0, 2)}
        </Avatar>
      ) : (
        <></>
      )}
      <VStack alignItems={"center"}>
        <Text fontSize={"12px"} color="coolGray.800" {..._textTitle}>
          {textTitle ? (
            textTitle
          ) : item?.fullName ? (
            item?.fullName
          ) : (
            <Text italic>{t("NOT_ENTERED")}</Text>
          )}
        </Text>
        <Text color="coolGray.400" fontSize={"10px"} {..._textSubTitle}>
          <HStack space={1}>
            <Text>{t("ROLL_NUMBER")}:</Text>
            {item.admissionNo ? (
              item.admissionNo.toString().padStart(2, "0")
            ) : (
              <Text italic>{t("NOT_ENTERED")}</Text>
            )}
          </HStack>
        </Text>
      </VStack>
    </VStack>
  ) : (
    <HStack space={typeof img === "undefined" || img === true ? 2 : 0}>
      {typeof img === "undefined" || img === true ? (
        <Avatar
          size="40px"
          bg={item?.avatarUrl ? "" : "amber.500"}
          {...(item?.avatarUrl ? { source: { uri: item.avatarUrl } } : {})}
          rounded="lg"
        >
          {item?.avatarUrl ? "" : item?.fullName?.toUpperCase().substr(0, 2)}
        </Avatar>
      ) : (
        <></>
      )}
      <VStack>
        <Text color="coolGray.800" bold {..._textTitle}>
          {textTitle ? (
            textTitle
          ) : item?.fullName ? (
            <>
              {type !== "card" ? (
                <HStack alignItems={"center"}>
                  {item.admissionNo ? (
                    item.admissionNo.toString().padStart(2, "0")
                  ) : (
                    <Text italic>{t("NOT_ENTERED")}</Text>
                  )}
                  <Text color={"coolGray.300"}>{" ??? "}</Text>
                </HStack>
              ) : (
                <></>
              )}
              {item?.fullName}
            </>
          ) : (
            <Text italic>{t("NOT_ENTERED")}</Text>
          )}
        </Text>
        {type === "card" ? (
          <HStack alignItems={"center"}>
            {item?.className ? (
              <Text>{item?.className}</Text>
            ) : (
              <Text italic>{t("NOT_ENTERED")}</Text>
            )}
            <Text color={"coolGray.400"}>{" ??? "}</Text>
            <Text>{t("ROLL_NUMBER") + "."} </Text>
            {item.admissionNo ? (
              <Text>{item.admissionNo.toString().padStart(2, "0")}</Text>
            ) : (
              <Text italic>{t("NOT_ENTERED")}</Text>
            )}
          </HStack>
        ) : type === "rollFather" ? (
          <Text color="coolGray.400" fontSize={"xs"} {..._textSubTitle}>
            {textSubTitle ? (
              textSubTitle
            ) : (
              <HStack space={1}>
                <Text>{t("ROLL_NUMBER") + "."}</Text>
                {item.admissionNo ? (
                  <Text>{item.admissionNo.toString().padStart(2, "0")}</Text>
                ) : (
                  <Text italic>{t("NOT_ENTERED")}</Text>
                )}
                <Text>{t("FATHERS_NAME")}:</Text>
                {item.fathersName ? (
                  <Text>{item.fathersName}</Text>
                ) : (
                  <Text italic>{t("NOT_ENTERED")}</Text>
                )}
              </HStack>
            )}
          </Text>
        ) : (
          <Text color="coolGray.400" fontSize={"xs"} {..._textSubTitle}>
            {textSubTitle ? (
              textSubTitle
            ) : (
              <HStack space={1}>
                <Text>{t("FATHERS_NAME")}:</Text>
                {item.fathersName ? (
                  <Text>{item.fathersName}</Text>
                ) : (
                  <Text italic>{t("NOT_ENTERED")}</Text>
                )}
              </HStack>
            )}
          </Text>
        )}
      </VStack>
    </HStack>
  );
};

function Card({
  item,
  img,
  type,
  href,
  rightComponent,
  hidePopUpButton,
  textTitle,
  textSubTitle,
  _textTitle,
  _textSubTitle,
  _arrow,
}) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [studentObject, setStudentObject] = useState(item);

  const handalOpenPoup = async (e) => {
    let classObj = await classServiceRegistry.getOne({
      id: e.currentClassID,
    });
    item.className = classObj.className;
    setOpen(true);
  };

  const PressableNew = ({ item, children, href, ...prop }) => {
    return href ? (
      <Link
        to={href}
        style={{ color: "rgb(63, 63, 70)", textDecoration: "none" }}
      >
        {children}
      </Link>
    ) : (
      <Box {...prop}>{children}</Box>
    );
  };

  return (
    <>
      <HStack justifyContent="space-between" width={"100%"} alignItems="center">
        <PressableNew href={href ? href : null}>
          <SubCard
            {...{
              item,
              img,
              type,
              textTitle,
              textSubTitle,
              _textTitle,
              _textSubTitle,
            }}
          />
        </PressableNew>
        {rightComponent ? (
          rightComponent
        ) : !hidePopUpButton ? (
          <>
            <Icon
              onPress={(e) => handalOpenPoup(item)}
              size="sm"
              color="gray.900"
              name="ArrowDownSLineIcon"
              {..._arrow}
            />
            <Actionsheet isOpen={open} onClose={(e) => setOpen(false)}>
              <Actionsheet.Content bg="studentCard.500" alignItems="inherit">
                <HStack justifyContent={"space-between"}>
                  <Box px="3" py="4" pt="0">
                    <SubCard
                      {...{
                        item,
                        img,
                        type: type ? type : "card",
                        textTitle,
                        textSubTitle,
                        _textTitle,
                        _textSubTitle,
                      }}
                    />
                  </Box>
                  <IconByName
                    name="CloseCircleLineIcon"
                    onPress={(e) => setOpen(false)}
                  />
                </HStack>
              </Actionsheet.Content>
              <Box bg="white" width={"100%"}>
                <Stack space={5}>
                  {/*<StudentEdit
                    {...{
                      studentObject,
                      setStudentObject,
                      onlyParameterProp: [
                        "address",
                        "fathersName",
                        "admissionNo",
                      ],
                    }}
                  />*/}
                  <VStack>
                    <Box px="5">
                      <HStack
                        alignItems={"center"}
                        justifyContent={"space-between"}
                      >
                        <Text fontSize="16px" fontWeight="500">
                          {t("NOTES")}
                        </Text>
                        <Button
                          variant="ghost"
                          colorScheme="button"
                          endIcon={
                            <IconByName name={"PencilLineIcon"} isDisabled />
                          }
                          _text={{ fontWeight: "400" }}
                        >
                          {t("EDIT")}
                        </Button>
                      </HStack>
                      <Box bg={"gray.100"} rounded={"md"} p="4">
                        <HStack
                          justifyContent={"space-between"}
                          alignItems="center"
                        >
                          <Text>{t("STUDENT_IS_GOOD_NEED")}</Text>
                        </HStack>
                      </Box>
                    </Box>
                  </VStack>
                  <Stack pb={5} alignItems={"center"}>
                    <Link
                      to={"/students/" + item.id}
                      style={{
                        textDecoration: "none",
                      }}
                    >
                      <Box
                        rounded="lg"
                        borderColor="button.500"
                        borderWidth="1"
                        _text={{ color: "button.500" }}
                        px={6}
                        py={2}
                      >
                        {t("SEE_MORE")}
                      </Box>
                    </Link>
                  </Stack>
                </Stack>
              </Box>
            </Actionsheet>
          </>
        ) : (
          <></>
        )}
      </HStack>
    </>
  );
}

/**
 * Class Subjects
 */
function ClassSubjectsPanel() {
  const { t } = useTranslation();

  return (
    <Collapsible defaultCollapse={true} header={t("SUBJECTS")}>
      <div>Class Subjects ...</div>
    </Collapsible>
  );
}

/**
 * Class Subjects
 */
function ClassDetailsPanel() {
  const { t } = useTranslation();

  return (
    <Collapsible defaultCollapse={true} header={t("CLASS_DETAILS")}>
      <div>Class Details ...</div>
    </Collapsible>
  );
}
