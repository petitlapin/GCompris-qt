#Add definition for UBUNTU
ADD_DEFINITIONS(-DUBUNTU)

configure_file(${CMAKE_CURRENT_SOURCE_DIR}/gcompris.desktop.cmake ${CMAKE_BINARY_DIR}/gcompris.desktop @ONLY)
configure_file(${CMAKE_CURRENT_SOURCE_DIR}/manifest.json.cmake ${CMAKE_BINARY_DIR}/manifest.json @ONLY)

install(FILES ${CMAKE_BINARY_DIR}/gcompris.desktop DESTINATION .)
install(FILES ${CMAKE_CURRENT_SOURCE_DIR}/gcompris256.png DESTINATION .)
install(FILES ${CMAKE_CURRENT_SOURCE_DIR}/apparmor.json DESTINATION .)
install(FILES ${CMAKE_BINARY_DIR}/manifest.json DESTINATION .)

# install qt.conf file
install(FILES ${CMAKE_SOURCE_DIR}/src/core/qt.conf DESTINATION bin/)
# install QtQuick.Controls files
install(DIRECTORY /usr/lib/arm-linux-gnueabihf/qt5/qml/QtQuick/Controls/ DESTINATION bin/plugins/QtQuick/Controls)

