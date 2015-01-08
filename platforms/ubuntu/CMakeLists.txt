# ubuntu build

find_program(CLICK_EXEC NAMES click)

# Look for click program
if (NOT CLICK_EXEC)
  message(FATAL_ERROR "Could not find click to build .click package.")
endif(NOT CLICK_EXEC)

# TODO see if needed
#configure_file(${CMAKE_CURRENT_SOURCE_DIR}/gcompris.desktop.cmake ${CMAKE_BINARY_DIR}/gcompris.desktop @ONLY)
configure_file(${CMAKE_CURRENT_SOURCE_DIR}/manifest.json.cmake ${CMAKE_BINARY_DIR}/manifest.json @ONLY)

add_custom_command (
  OUTPUT createClickPackage
  DEPENDS ${CMAKE_BINARY_DIR}/manifest.json
  COMMAND ${CLICK_EXEC} build .
)

# Command to create apk from Makefile
add_custom_target (click_package
   DEPENDS createClickPackage
)
