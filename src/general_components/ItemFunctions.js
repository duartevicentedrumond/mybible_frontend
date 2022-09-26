import { dateToString } from "./Functions";

//function to get location
export function getLocation(
    [location, setLocation],
    [buildings, rooms, furnitures, sections, boxes, items],
    elementId,
    type
) {

    let filteredElement = [];

    switch (type) {
        case 'building':

            filteredElement = buildings.filter(building => {
                if (String(building.buildingId) === String(elementId)) {
                    return building;
                }
            })[0];

            if (filteredElement !== undefined) {
                setLocation(existingLocation => ({
                    ...existingLocation,
                    building: {
                        buildingId: filteredElement.buildingId,
                        name: filteredElement.name
                    }
                }));
            };

            break;

        case 'room':

            filteredElement = rooms.filter(room => {
                if (String(room.roomId) === String(elementId)) {
                    return room;
                }
            })[0];

            if (filteredElement !== undefined) {
                setLocation(existingLocation => ({
                    ...existingLocation,
                    building: {
                        buildingId: null,
                        name: null
                    },
                    room: {
                        roomId: filteredElement.roomId,
                        name: filteredElement.name
                    }
                }));
            };

            break;

        case 'furniture':

            filteredElement = furnitures.filter(furniture => {
                if (String(furniture.furnitureId) === String(elementId)) {
                    return furniture;
                }
            })[0];

            if (filteredElement !== undefined) {
                setLocation(existingLocation => ({
                    ...existingLocation,
                    building: {
                        buildingId: null,
                        name: null
                    },
                    room: {
                        roomId: null,
                        name: null
                    },
                    furniture: {
                        furnitureId: filteredElement.furnitureId,
                        name: filteredElement.name
                    }
                }));
            };

            break;

        case 'section':

            filteredElement = sections.filter(section => {
                if (String(section.sectionId) === String(elementId)) {
                    return section;
                }
            })[0];

            if (filteredElement !== undefined) {
                setLocation(existingLocation => ({
                    ...existingLocation,
                    building: {
                        buildingId: null,
                        name: null
                    },
                    room: {
                        roomId: null,
                        name: null
                    },
                    furniture: {
                        furnitureId: null,
                        name: null
                    },
                    section: {
                        sectionId: filteredElement.sectionId,
                        name: filteredElement.name
                    }
                }));
            };

            break;

        case 'box':

            filteredElement = boxes.filter(box => {
                if (String(box.boxId) === String(elementId)) {
                    return box;
                }
            })[0];

            if (filteredElement !== undefined) {
                setLocation(existingLocation => ({
                    ...existingLocation,
                    building: {
                        buildingId: null,
                        name: null
                    },
                    room: {
                        roomId: null,
                        name: null
                    },
                    furniture: {
                        furnitureId: null,
                        name: null
                    },
                    section: {
                        sectionId: null,
                        name: null
                    },
                    box: {
                        boxId: filteredElement.boxId,
                        name: filteredElement.name
                    }
                }));
            };

            break;

        case 'item':

            filteredElement = items.filter(item => {
                if (String(item.itemId) === String(elementId)) {
                    return item;
                }
            })[0];

            if (filteredElement !== undefined) {
                setLocation(existingLocation => ({
                    ...existingLocation,
                    building: {
                        buildingId: null,
                        name: null
                    },
                    room: {
                        roomId: null,
                        name: null
                    },
                    furniture: {
                        furnitureId: null,
                        name: null
                    },
                    section: {
                        sectionId: null,
                        name: null
                    },
                    box: {
                        boxId: null,
                        name: null
                    },
                    item: {
                        itemId: filteredElement.itemId,
                        name: filteredElement.name
                    }
                }));
            };

        default:
            break;
    };

    if (filteredElement !== null && filteredElement !== undefined && filteredElement.box !== null && filteredElement.box !== undefined) {
        console.log(filteredElement)        
        getLocation(
            [location, setLocation],
            [buildings, rooms, furnitures, sections, boxes, items],
            filteredElement.box.boxId,
            "box"
        )
    } else if (filteredElement !== null && filteredElement !== undefined && filteredElement.section !== null && filteredElement.section !== undefined) {
        console.log(filteredElement)
        getLocation(
            [location, setLocation],
            [buildings, rooms, furnitures, sections, boxes, items],
            filteredElement.section.sectionId,
            "section"
        )
    } else if (filteredElement !== null && filteredElement !== undefined && filteredElement.furniture !== null && filteredElement.furniture !== undefined) {
        getLocation(
            [location, setLocation],
            [buildings, rooms, furnitures, sections, boxes, items],
            filteredElement.furniture.furnitureId,
            "furniture"
        )
    } else if (filteredElement !== null && filteredElement !== undefined && filteredElement.room !== null && filteredElement.room !== undefined) {
        getLocation(
            [location, setLocation],
            [buildings, rooms, furnitures, sections, boxes, items],
            filteredElement.room.roomId,
            "room"
        )
    } else if (filteredElement !== null && filteredElement !== undefined && filteredElement.building !== null && filteredElement.building !== undefined) {
        getLocation(
            [location, setLocation],
            [buildings, rooms, furnitures, sections, boxes, items],
            filteredElement.building.buildingId,
            "building"
        )
    };

};

//udpate state when name input changes
export function handleNameChange(e, setElement) {
    setElement(existingElement => ({
        ...existingElement,
        name: e.target.value
    }));
};

//udpate state when name input changes
export function handleActiveChange(e, setElement) {
    setElement(existingElement => ({
        ...existingElement,
        active: e.target.checked
    }));

    if (e.target.checked) {
        handleUntilChange(null, setElement);
    } else {
        handleUntilChange(new Date(), setElement);
    }

};

//udpate state when since input changes
export function handleSinceChange(date, setElement) {

    const dateString = dateToString(date);

    setElement(existingElement => ({
        ...existingElement,
        since: dateString
    }));
};

//udpate state when until input changes
export function handleUntilChange(date, setElement) {

    const dateString = dateToString(date);

    setElement(existingElement => ({
        ...existingElement,
        until: dateString
    }));
};

//udpate state when building input changes
export function handleBuildingChange(buildingId, setElement) {
    setElement(existingElement => ({
        ...existingElement,
        building: { buildingId: buildingId },
        room: null,
        furniture: null,
        section: null,
        box: null
    }));
};

//udpate state when room input changes
export function handleRoomChange(roomId, setElement) {
    setElement(existingElement => ({
        ...existingElement,
        building: null,
        room: { roomId: roomId },
        furniture: null,
        section: null,
        box: null
    }));
};

//udpate state when furniture input changes
export function handleFurnitureChange(furnitureId, setElement) {
    setElement(existingElement => ({
        ...existingElement,
        building: null,
        room: null,
        furniture: { furnitureId: furnitureId },
        section: null,
        box: null
    }));
};

//udpate state when section input changes
export function handleSectionChange(sectionId, setElement) {
    setElement(existingElement => ({
        ...existingElement,
        building: null,
        room: null,
        furniture: null,
        section: { sectionId: sectionId },
        box: null
    }));
};

//udpate state when box input changes
export function handleBoxChange(boxId, setElement) {
    setElement(existingElement => ({
        ...existingElement,
        building: null,
        room: null,
        furniture: null,
        section: null,
        box: { boxId: boxId }
    }));
};

//udpate state when until input changes
export function onBuildingClick(e, setItem, [newLocation, location, setLocation], [buildings, rooms, furnitures, sections, boxes, items]) {

    //prevent page refresh
    e.preventDefault();

    const buildingId = e.target.dataset.buildingid;
    handleBuildingChange(buildingId, setItem);
    setLocation(newLocation);
    getLocation(
        [location, setLocation],
        [buildings, rooms, furnitures, sections, boxes, items],
        buildingId,
        'building'
    );

};

//udpate state when room input changes
export function onRoomClick(e, setItem, [newLocation, location, setLocation], [buildings, rooms, furnitures, sections, boxes, items]) {

    //prevent page refresh
    e.preventDefault();

    const roomId = e.target.dataset.roomid;
    handleRoomChange(roomId, setItem);
    setLocation(newLocation);
    getLocation(
        [location, setLocation],
        [buildings, rooms, furnitures, sections, boxes, items],
        roomId,
        'room'
    );
};

//udpate state when furniture input changes
export function onFurnitureClick(e, setItem, [newLocation, location, setLocation], [buildings, rooms, furnitures, sections, boxes, items]) {

    //prevent page refresh
    e.preventDefault();

    const furnitureId = e.target.dataset.furnitureid;
    handleFurnitureChange(furnitureId, setItem);
    setLocation(newLocation);
    getLocation(
        [location, setLocation],
        [buildings, rooms, furnitures, sections, boxes, items],
        furnitureId,
        'furniture'
    );
};

//udpate state when section input changes
export function onSectionClick(e, setItem, [newLocation, location, setLocation], [buildings, rooms, furnitures, sections, boxes, items]) {

    //prevent page refresh
    e.preventDefault();

    const sectionId = e.target.dataset.sectionid;
    handleSectionChange(sectionId, setItem);
    setLocation(newLocation);
    getLocation(
        [location, setLocation],
        [buildings, rooms, furnitures, sections, boxes, items],
        sectionId,
        'section'
    );
};

//udpate state when box input changes
export function onBoxClick(e, setItem, [newLocation, location, setLocation], [buildings, rooms, furnitures, sections, boxes, items]) {

    //prevent page refresh
    e.preventDefault();

    const boxId = e.target.dataset.boxid;
    handleBoxChange(boxId, setItem);
    setLocation(newLocation);
    getLocation(
        [location, setLocation],
        [buildings, rooms, furnitures, sections, boxes, items],
        boxId,
        'box'
    );
};