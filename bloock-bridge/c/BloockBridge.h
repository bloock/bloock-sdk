#ifndef BloockBridge_H
#define BloockBridge_H
#include <stdio.h>
#include <stdint.h>
#include <stddef.h>
#include <stdbool.h>
#include "diplomat_runtime.h"

#ifdef __cplusplus
namespace capi {
#endif

typedef struct BloockBridge {
    size_t _phantom;
} BloockBridge;
#ifdef __cplusplus
} // namespace capi
#endif
#include "diplomat_result_void_void.h"
#ifdef __cplusplus
namespace capi {
extern "C" {
#endif

diplomat_result_void_void BloockBridge_request(const char* request_type_data, size_t request_type_len, const char* payload_data, size_t payload_len, DiplomatWriteable* response);
void BloockBridge_destroy(BloockBridge* self);

#ifdef __cplusplus
} // extern "C"
} // namespace capi
#endif
#endif
