// UserParts에 집중하지말고 User에만 집중하면된다. User는 datamodel에 있는거하고 같은 이름으로 해줘야한다.
export const USER_FRAGMENT = `
    id
    userName
`;

export const COMMENT_FRAGMENT = `
    id
    text
    user {
        ${USER_FRAGMENT}
    }
`;

export const FILE_FRAGMENT = `
    id
    url
`;

export const FULL_POST_FRAGMENT = `
    fragment PostParts on Post{
        id
        location
        caption
        files{
            ${FILE_FRAGMENT}
        }
        comments{
            ${COMMENT_FRAGMENT}
        }
        user{
            ${USER_FRAGMENT}
        }
    }
`;

export const ROOM_FRAGMENT = `
    fragment RoomParts on Room {
        id
        participants {
            id
        }
    }
`;
