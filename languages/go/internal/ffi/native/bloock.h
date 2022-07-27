/**
 * We use the convention of zero as an error term,
 * since we also use `null_ptr()` to indicate an error.
 * So for consistency, a zero term is an error in both cases.
 */
#define bloock_BLOOCK_FAILURE 0

#define bloock_BLOOCK_SUCCESS 1

typedef struct bloock_BloockClient bloock_BloockClient;

typedef struct bloock_Record bloock_Record;

typedef struct bloock_Buffer {
  uint8_t *data;
  uintptr_t len;
} bloock_Buffer;

/**
 * Wrapper struct to help us return errors
 */
typedef struct bloock_CResult_c_void {
  void *result;
  const char *error;
} bloock_CResult_c_void;

/**
 * Wrapper struct to help us return errors
 */
typedef struct bloock_CResult_c_char {
  char *result;
  const char *error;
} bloock_CResult_c_char;

typedef struct bloock_RecordList {
  struct bloock_Record *data;
  uintptr_t len;
} bloock_RecordList;

/**
 * Wrapper struct to help us return errors
 */
typedef struct bloock_CResult_Record {
  struct bloock_Record *result;
  const char *error;
} bloock_CResult_Record;

/**
 * Wrapper struct to help us return errors
 */
typedef struct bloock_CResult_i64 {
  int64_t *result;
  const char *error;
} bloock_CResult_i64;

struct bloock_Buffer *new_byte_array(uint8_t *ptr, uintptr_t len);

struct bloock_BloockClient *client_new(const char *name);

struct bloock_CResult_c_void *client_set_api_host(struct bloock_BloockClient *_self,
                                                  const char *host);

struct bloock_CResult_c_void *client_set_network_configuration(struct bloock_BloockClient *_self,
                                                               const char *network,
                                                               const char *configuration);

struct bloock_CResult_c_char *client_send_records(struct bloock_BloockClient *_self,
                                                  struct bloock_RecordList *records);

struct bloock_CResult_c_char *client_get_anchor(struct bloock_BloockClient *_self, int64_t anchor);

struct bloock_CResult_c_char *client_wait_anchor(struct bloock_BloockClient *_self,
                                                 int64_t anchor,
                                                 int64_t timeout);

/**
 * Recovers the original boxed version of `bloock` so that
 * it can be properly freed
 */
int32_t client_free(struct bloock_BloockClient *bloock);

struct bloock_RecordList *new_record_list(struct bloock_Record *ptr, uintptr_t len);

int32_t record_list_free(struct bloock_RecordList *records);

struct bloock_CResult_Record *record_from_hash(const char *hash);

struct bloock_CResult_Record *record_from_hex(const char *hex);

struct bloock_CResult_Record *record_from_string(const char *s);

struct bloock_CResult_Record *record_from_typed_array(struct bloock_Buffer *buf);

struct bloock_CResult_Record *record_from_pdf(struct bloock_Buffer *buf);

struct bloock_CResult_Record *record_from_json(const char *hash);

struct bloock_CResult_c_char *record_get_hash(struct bloock_Record *_self);

int32_t record_free(struct bloock_Record *record);

/**
 * Recovers the original boxed version of `result` so that
 * it can be properly freed
 */
int32_t result_void_free(struct bloock_CResult_c_void *result);

int32_t result_int_free(struct bloock_CResult_i64 *result);

int32_t result_string_free(struct bloock_CResult_c_char *result);

int32_t result_record_free(struct bloock_CResult_Record *result);

/**
 * Required to free strings properly
 */
int32_t string_free(char *s);
