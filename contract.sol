// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.19;

contract StoryPromptContract {
    // Struct to represent a word in a story prompt
    struct Word {
        string word;
        address author;
    }

    // Struct to represent a story prompt
    struct StoryPrompt {
        uint[] words;  // Fixed-size array with a maximum of 10 words
        bool isCompleted;
    }

    // Struct to represent a completed story
    struct Story {
        uint prompt;
        string story;
        string title;
    }

    // Arrays to store words, story prompts, completed stories, and in-progress story queries
    StoryPrompt[] public storyPrompts;
    Story[] public completedStories;
    Word[] public words;

    // Event to notify when a new word is submitted
    event WordSubmitted(uint indexed promptIndex, uint indexed wordIndex, address indexed author);

    // Event to notify when a new story prompt is submitted
    event StoryPromptSubmitted(uint indexed promptIndex, address indexed author);

    // Event to notify when a story is completed
    event StoryCompleted(uint indexed promptIndex, address indexed author, string story, string title);

    function createStoryPrompt() public {
        StoryPrompt memory newPrompt = StoryPrompt({
            words: new uint[](0), // Initialize an empty array
            isCompleted: false
        });

        storyPrompts.push(newPrompt);

        emit StoryPromptSubmitted(storyPrompts.length - 1, msg.sender);
    }
  
    // Function to submit a word for a story prompt
    function submitWord(uint promptIndex, string memory word) public {
        Word memory newWord = Word({
            word: word,
            author: msg.sender
        });

        words.push(newWord);

        storyPrompts[promptIndex].words.push(words.length-1);

        emit WordSubmitted(0, promptIndex, msg.sender);  // Assuming a default prompt index of 0
    }

    // Function to complete a story prompt
    function completePrompt(uint promptIndex, string memory story, string memory title) public {

        storyPrompts[promptIndex].isCompleted = true;

        // Create a new Story entry
        Story memory newStory = Story({
            prompt: promptIndex,
            story: story,
            title: title
        });

        completedStories.push(newStory);

        emit StoryCompleted(promptIndex, msg.sender, story, title);
    }

    // Function to get the details of a story prompt
    function getStoryPrompt(uint promptIndex) public view returns (string memory, bool) {
        require(promptIndex < storyPrompts.length, "Invalid prompt index");
        StoryPrompt memory prompt = storyPrompts[promptIndex];
        string memory concatenatedWords;
        
        for (uint i = 0; i < prompt.words.length; i++) {
            // Append each word to the concatenated string with a space
            concatenatedWords = string(abi.encodePacked(concatenatedWords, words[prompt.words[i]].word, " "));
        }

        return (concatenatedWords, prompt.isCompleted);
    }

    // Function to get the total number of story prompts
    function getStoryPromptCount() public view returns (uint) {
        return storyPrompts.length;
    }

    // Function to get the total number of completed stories
    function getCompletedStoriesCount() public view returns (uint) {
        return completedStories.length;
    }

    // Function to get a completed prompt by index
    function getCompletedStoryPrompt(uint index) public view returns (StoryPrompt memory) {
        require(index < storyPrompts.length, "Invalid story index");
        return storyPrompts[index];
    }

    // Function to get all completed stories
    function getAllCompletedStories() public view returns (Story[] memory) {
        return completedStories;
    }

    function getAllCompletedStoryPrompts() public view returns (StoryPrompt[] memory) {
        return storyPrompts;
    }

    // Function to get a completed story by index
    function getCompletedStoryByIndex(uint index) public view returns (Story memory) {
        require(index < completedStories.length, "Invalid story index");
        return completedStories[index];
    }

}
