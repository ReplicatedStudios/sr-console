clear
printf "\x1b[32m\x1b[1m[STEP: 0]: Iniciando \x1b[0m\n"
cd "${EXOPLAYER_FFMPEG_PATH}/jni"
printf "\x1b[33m[STEP: 1]: Clonando repositorio FFMPEG... \x1b[0m\n"
git clone git://source.ffmpeg.org/ffmpeg
if [ $? -eq 0 ]; then
    printf "\x1b[33m[STEP: 2]: Cambiando FFMPEG a la version 4.2... \x1b[0m\n"
    cd ffmpeg
    git checkout release/4.2

    if [ $? -eq 0 ]; then
        printf "\x1b[33m[STEP: 3]: Construyendo FFMPEG para ${ENABLED_DECODERS[@]}\x1b[0m\n"
        cd "${EXOPLAYER_FFMPEG_PATH}/jni" && ./build_ffmpeg.sh \ "${EXOPLAYER_FFMPEG_PATH}" "${NDK_PATH}" "linux-x86_64" "${ENABLED_DECODERS[@]}"

        if [ $? -eq 0 ]; then
            printf "\x1b[33m[STEP: 4]: Iniciando gradlew... \x1b[0m\n"
            cd "${EXOPLAYER_ROOT}"
            ./gradlew extension-ffmpeg:assembleRelease

            if [ $? -eq 0 ]; then
                printf "\x1b[32m[ENDED]: ¡Completado!\x1b[0m\n"
                printf "\x1b[32m[ENDED]: Encontraras el archivo en la carpeta de la extension en formato .aar\x1b[0m\n"
            else
                printf "\x1b[31m\x1b[1m[STEP: 4]: Gradlew no pudo compilar la extension \x1b[0m\n" >&2
                exit 1
            fi
        else
            printf "\x1b[31m\x1b[1m[STEP: 3]: Ocurrio un error al construir el FFMPEG \x1b[0m\n" >&2
            exit 1
        fi
    else
        printf "\x1b[31m\x1b[1m[STEP: 2]: FFMPEG no incluye la version 4.2 \x1b[0m\n" >&2
        exit 1
    fi
else
    printf "\x1b[31m\x1b[1m[STEP: 1]: No se pudo clonar el repositiorio \x1b[0m\n" >&2
    exit 1
fi