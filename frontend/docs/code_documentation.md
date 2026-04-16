# CodePad Frontend Documentation

This document contains information, logic context, and structural references that were extracted from source code comments to keep the codebase clean.

## Architecture

The application is structured into two main panels:
1. **Left Panel**: Contains the Code Editor (Monaco Editor implementation).
   - Features language tabs for switching environments.
   - Includes a run button that triggers compilation.
2. **Right Panel**: Serving as a Sidebar, it houses the Terminal and Chat.
   - **Terminal**: Displays output logs, errors, and system messages.
   - **Chat**: Real-time team communication interface.

## Logic Flows

### Socket Syncing
- The application automatically emits a join-room event upon initialization.
- It listens for events including `code-change`, `language-change`, and `chat-message`.
- It dynamically updates the state based on the team's real-time interaction.
- The system automatically triggers side-effects to auto-scroll the terminal and chat containers when new entries are appended.

### User Interaction Handlers
- **Editor Changes**: Capture the updated text and immediately broadcast it to the room.
- **Language Changes**: Switching languages completely resets the boilerplate string and alerts the socket room of the new language selection.
- **Send Chat**: Dispatches the chat payload and optimistically appends the sender's own message locally using the time string.

### Execution Logic
- Compilation is bridged through JDoodle.
- Loading states disable the run button to avoid multi-clicks.
- Responses containing `stderr` format lines with `err:` prefixes.
- Standard execution (`stdout`) populates the output window with `out:` prefixes.
- Internal notices are formatted with `sys:` prefixes.

## Colors & Styling Logics
- System error logs (e.g. `err:`) resolve to a Red visual identifier.
- Standard output logs (`out:`) resolve to a Green visual identifier.
- System notifications (`sys:`) resolve to a Gray visual identifier, along with italicized styling.
