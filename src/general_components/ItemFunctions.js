import { dateToString } from "./Functions";

//function to get location
export function getLocation(
    [location, setLocation],
    [buildings, rooms, furnitures, sections, boxes, items],
    elementId,
    type
) {

    switch (type) {
        case 'building':

            const filteredBuilding = buildings.filter(building => {
                if (String(building.buildingId) === String(elementId)) {
                    return building;
                }
            })[0];

            setLocation(existingLocation => ({
                ...existingLocation,
                building: {
                    buildingId: filteredBuilding.buildingId,
                    name: filteredBuilding.name
                }
            }));

            break;

        case 'room':

            const filteredRoom = rooms.filter(room => {
                if (String(room.roomId) === String(elementId)) {
                    return room;
                }
            })[0];

            setLocation(existingLocation => ({
                ...existingLocation,
                building: {
                    buildingId: null,
                    name: null
                },
                room: {
                    roomId: filteredRoom.roomId,
                    name: filteredRoom.name
                }
            }));

            if (filteredRoom.building !== null) {
                getLocation(
                    [location, setLocation],
                    [buildings, rooms, furnitures, sections, boxes, items],
                    filteredRoom.building.buildingId,
                    "building"
                )
            };

            break;

        case 'furniture':

            const filteredFurniture = furnitures.filter(furniture => {
                if (String(furniture.furnitureId) === String(elementId)) {
                    return furniture;
                }
            })[0];

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
                    furnitureId: filteredFurniture.furnitureId,
                    name: filteredFurniture.name
                }
            }));

            if (filteredFurniture.room !== null) {
                getLocation(
                    [location, setLocation],
                    [buildings, rooms, furnitures, sections, boxes, items],
                    filteredFurniture.room.roomId,
                    "room"
                )
            } else if (filteredFurniture.building !== null) {
                getLocation(
                    [location, setLocation],
                    [buildings, rooms, furnitures, sections, boxes, items],
                    filteredFurniture.building.buildingId,
                    "building"
                )
            };

            break;

        case 'section':

            const filteredSection = sections.filter(section => {
                if (String(section.sectionId) === String(elementId)) {
                    return section;
                }
            })[0];

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
                    sectionId: filteredSection.sectionId,
                    name: filteredSection.name
                }
            }));

            if (filteredSection.furniture !== null) {
                getLocation(
                    [location, setLocation],
                    [buildings, rooms, furnitures, sections, boxes, items],
                    filteredSection.furniture.furnitureId,
                    "furniture"
                )
            } else if (filteredSection.room !== null) {
                getLocation(
                    [location, setLocation],
                    [buildings, rooms, furnitures, sections, boxes, items],
                    filteredSection.room.roomId,
                    "room"
                )
            } else if (filteredSection.building !== null) {
                getLocation(
                    [location, setLocation],
                    [buildings, rooms, furnitures, sections, boxes, items],
                    filteredSection.building.buildingId,
                    "building"
                )
            };

            break;

        case 'box':

            const filteredBox = boxes.filter(box => {
                if (String(box.boxId) === String(elementId)) {
                    return box;
                }
            })[0];

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
                    boxId: filteredBox.boxId,
                    name: filteredBox.name
                }
            }));

            if (filteredBox.section !== null) {
                getLocation(
                    [location, setLocation],
                    [buildings, rooms, furnitures, sections, boxes, items],
                    filteredBox.section.sectionId,
                    "section"
                )
            } else if (filteredBox.furniture !== null) {
                getLocation(
                    [location, setLocation],
                    [buildings, rooms, furnitures, sections, boxes, items],
                    filteredBox.furniture.furnitureId,
                    "furniture"
                )
            } else if (filteredBox.room !== null) {
                getLocation(
                    [location, setLocation],
                    [buildings, rooms, furnitures, sections, boxes, items],
                    filteredBox.room.roomId,
                    "room"
                )
            } else if (filteredBox.building !== null) {
                getLocation(
                    [location, setLocation],
                    [buildings, rooms, furnitures, sections, boxes, items],
                    filteredBox.building.buildingId,
                    "building"
                )
            };

            break;

        case 'item':

            const filteredItem = items.filter(item => {
                if (String(item.itemId) === String(elementId)) {
                    return item;
                }
            })[0];

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
                    itemId: filteredItem.itemId,
                    name: filteredItem.name
                }
            }));

            if (filteredItem.box !== null) {
                getLocation(
                    [location, setLocation],
                    [buildings, rooms, furnitures, sections, boxes, items],
                    filteredItem.box.boxId,
                    "box"
                )
            } else if (filteredItem.section !== null) {
                getLocation(
                    [location, setLocation],
                    [buildings, rooms, furnitures, sections, boxes, items],
                    filteredItem.section.sectionId,
                    "section"
                )
            } else if (filteredItem.furniture !== null) {
                getLocation(
                    [location, setLocation],
                    [buildings, rooms, furnitures, sections, boxes, items],
                    filteredItem.furniture.furnitureId,
                    "furniture"
                )
            } else if (filteredItem.room !== null) {
                getLocation(
                    [location, setLocation],
                    [buildings, rooms, furnitures, sections, boxes, items],
                    filteredItem.room.roomId,
                    "room"
                )
            } else if (filteredItem.building !== null) {
                getLocation(
                    [location, setLocation],
                    [buildings, rooms, furnitures, sections, boxes, items],
                    filteredItem.building.buildingId,
                    "building"
                )
            };

            break;

        default:
            break;
    }
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

//udpate item state when since input changes
export function handleSinceChange(date, setElement) {

    const dateString = dateToString(date);

    setElement(existingElement => ({
        ...existingElement,
        since: dateString
    }));
};

//udpate item state when until input changes
export function handleUntilChange(date, setElement) {

    const dateString = dateToString(date);

    setElement(existingElement => ({
        ...existingElement,
        until: dateString
    }));
};

//udpate item state when building input changes
export function handleBuildingChange(buildingId, setElement) {
    setElement(existingElement => ({
        ...existingElement,
        building: { buildingId: buildingId }
    }));
};

//udpate item state when room input changes
export function handleRoomChange(roomId, setElement) {
    setElement(existingElement => ({
        ...existingElement,
        room: { roomId: roomId }
    }));
};

//udpate item state when furniture input changes
export function handleFurnitureChange(furnitureId, setElement) {
    setElement(existingElement => ({
        ...existingElement,
        furniture: { furnitureId: furnitureId }
    }));
};

//udpate item state when section input changes
export function handleSectionChange(sectionId, setElement) {
    setElement(existingElement => ({
        ...existingElement,
        section: { sectionId: sectionId }
    }));
};

//udpate item state when box input changes
export function handleBoxChange(boxId, setElement) {
    setElement(existingElement => ({
        ...existingElement,
        box: { boxId: boxId }
    }));
};

//udpate item state when until input changes
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

//udpate item state when room input changes
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

//udpate item state when furniture input changes
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

//udpate item state when section input changes
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

//udpate item state when box input changes
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