import {
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  Textarea,
  useColorModeValue,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";

const NoteCard = ({ noteID, title, body, getNotes }) => {
  const [updatedTitle, setUpdatedTitle] = useState(title);
  const [updatedBody, setUpdatedBody] = useState(body);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDelete = async () => {
    try {
      await axios.delete(
        `https://tasknest-notes-app.onrender.com/notes/${noteID}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log("Note deleted successfully");

      getNotes();
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };
  const handleEdit = () => {
    setIsModalOpen(true);
  };

  const handleUpdate = async () => {
    try {
      await axios.patch(
        `https://tasknest-notes-app.onrender.com/notes/${noteID}`,
        {
          title: updatedTitle,
          body: updatedBody,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log("Note updated successfully");
      setIsModalOpen(false);

      getNotes();
    } catch (error) {
      console.error("Error updating note:", error);
    }
  };
 
  return (
    <>
      <Box
        display={"flex"}
        flexDirection={"column"}
        alignItems="center"
        p={"2rem 1.4rem"}
        boxShadow={
          "rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px"
        }
        borderRadius={"1rem"}
        bg={useColorModeValue("white", "gray.700")}
      >
        <Text fontWeight="bold" fontSize="lg" borderBottom="2px solid black" >
          {title}
        </Text>
        <Text
          w={{ base: "80%", md: "100%" }}
          m={{ base: "auto", md: "0" }}
          textAlign={"center"}
        >
          {body}
        </Text>
        <Flex mt={4}>
          <Button colorScheme="blue" mr={2} onClick={handleEdit}>
            Edit Task
          </Button>
          <Button colorScheme="red" onClick={handleDelete}>
            Delete
          </Button>
        </Flex>

        {/* modal */}
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Edit Note</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl>
                <FormLabel>Title:</FormLabel>
                <Input
                  type="text"
                  value={updatedTitle}
                  onChange={(e) => setUpdatedTitle(e.target.value)}
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Body:</FormLabel>
                <Textarea
                  value={updatedBody}
                  onChange={(e) => setUpdatedBody(e.target.value)}
                />
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" onClick={handleUpdate}>
                Update
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    </>
  );
};

export default NoteCard;
