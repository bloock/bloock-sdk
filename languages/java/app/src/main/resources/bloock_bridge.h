#include <stdarg.h>
#include <stdbool.h>
#include <stdint.h>
#include <stdlib.h>

typedef const char *FfiStr;

FfiStr request(FfiStr request_type, FfiStr payload);
