# ubuntu build
find_program(CLICK_EXEC NAMES click)

#Add definition for UBUNTU
ADD_DEFINITIONS(-DUBUNTU)
# Look for click program
if (NOT CLICK_EXEC)
  message(FATAL_ERROR "Could not find click to build .click package.")
endif(NOT CLICK_EXEC)

# TODO see if needed
configure_file(${CMAKE_CURRENT_SOURCE_DIR}/gcompris.desktop.cmake ${CMAKE_BINARY_DIR}/gcompris.desktop @ONLY)
configure_file(${CMAKE_CURRENT_SOURCE_DIR}/manifest.json.cmake ${CMAKE_BINARY_DIR}/manifest.json @ONLY)

add_custom_command (
  OUTPUT createClickPackage
  DEPENDS ${CMAKE_BINARY_DIR}/manifest.json ${CMAKE_BINARY_DIR}/gcompris.desktop
  COMMAND ${CMAKE_COMMAND} -E copy ${CMAKE_CURRENT_SOURCE_DIR}/apparmor.json ${CMAKE_BINARY_DIR}/apparmor.json
  COMMAND ${CMAKE_COMMAND} -E copy ${CMAKE_CURRENT_SOURCE_DIR}/.excludes ${CMAKE_BINARY_DIR}/.excludes
  COMMAND ${CMAKE_COMMAND} -E copy ${CMAKE_CURRENT_SOURCE_DIR}/gcompris256.png ${CMAKE_BINARY_DIR}/gcompris256.png
  COMMAND ${CLICK_EXEC} build .
  WORKING_DIRECTORY ${CMAKE_BINARY_DIR}
)

# Command to create apk from Makefile
add_custom_target (click_package
   DEPENDS createClickPackage
)
