plugins {
    kotlin("jvm") version "1.9.24"
}

dependencies {
    implementation("org.apache.commons:commons-text:1.9")
    implementation("org.yaml:snakeyaml:1.30")
    implementation("com.thoughtworks.xstream:xstream:1.4.17")
    compileOnly("javax.servlet:javax.servlet-api:4.0.1")
}
